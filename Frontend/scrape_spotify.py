import spotipy
from spotipy.oauth2 import SpotifyOAuth
import yt_dlp
from dotenv import load_dotenv
import os
import re
from pytube import YouTube

load_dotenv()

SPOTIPY_CLIENT_ID = os.getenv('SPOTIPY_CLIENT_ID')
SPOTIPY_CLIENT_SECRET = os.getenv('SPOTIPY_CLIENT_SECRET')
SPOTIPY_REDIRECT_URI = os.getenv('SPOTIPY_REDIRECT_URI')
SPOTIPY_USERNAME = os.getenv('SPOTIPY_USERNAME')

scope = 'playlist-read-private playlist-modify-private'


def authenticate_spotify():
    return spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=SPOTIPY_CLIENT_ID,
                                                      client_secret=SPOTIPY_CLIENT_SECRET,
                                                      redirect_uri=SPOTIPY_REDIRECT_URI,
                                                      scope=scope,
                                                      username=SPOTIPY_USERNAME))


def sanitize_filename(filename):
    # Remove invalid characters from the filename
    return re.sub(r'[\\/:"*?<>|]+', '', filename)


def search_youtube(query):
    ydl = yt_dlp.YoutubeDL()
    search_results = ydl.extract_info(f"ytsearch:{query}", download=False)

    if 'entries' in search_results:
        first_result = search_results['entries'][0]
        return first_result['id']
    else:
        print(f"No search results found for {query}")
        return None


def download_youtube_video(video_id, output_path, quality):
    youtube_url = f'https://www.youtube.com/watch?v={video_id}'

    ydl_opts = {
        'format': quality,  # You can specify the quality here
        'outtmpl': f'{output_path}/%(title)s.%(ext)s',                                 # Using yt_dlp
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([youtube_url])


# def download_youtube_video(video_id, output_path, quality):
#     try:
#         youtube_url = f'https://www.youtube.com/watch?v={video_id}'
        
#         # Create a YouTube object
#         yt = YouTube(youtube_url)

#         # Get the highest resolution stream (you can customize this based on your preferences)
#         video_stream = yt.streams.get_highest_resolution()

#         # Download the video to the specified output path
#         video_stream.download(output_path)

#         print(f"Video downloaded successfully to {output_path}")
        
#     except Exception as e:
#         print(f"Error: {e}")


def download_youtube_audio(video_id, output_path, quality):
    youtube_url = f'https://www.youtube.com/watch?v={video_id}'
    
    yt = YouTube(youtube_url)
    
    # Get the audio stream
    audio_stream = yt.streams.filter(only_audio=True).first()
    
    # Download the audio stream
    audio_stream.download(output_path)
    
    # Get the downloaded file path
    downloaded_file_path = os.path.join(output_path, audio_stream.default_filename)
    
    # Sanitize the title for the filename
    sanitized_title = sanitize_filename(yt.title)
    
    # Rename the downloaded file
    new_file_path = os.path.join(output_path, f"{sanitized_title}.mp3")
    os.rename(downloaded_file_path, new_file_path)

def download_song_by_link():
    song_link = input("Enter the song link from spotify: ")
    sp = authenticate_spotify()
    track_info = sp.track(song_link)
    song_name = track_info['name']
    artist_name = track_info['artists'][0]['name']
    query = f"{song_name} {artist_name}"

    youtube_id = search_youtube(query)

    print("Choose a download method:")
    print("1. Audio File")
    print("2. Video File")

    choice = input("Enter your choice (1 or 2): ")

    choiceSelected = {
        '1': download_youtube_audio,
        '2': download_youtube_video,
    }
    
    selected_method = choiceSelected.get(choice)
    
    if selected_method:
        video_quality = '137' if choice == '2' else 'best'
        selected_method(youtube_id, 'downloads', quality=video_quality)
    else:
        print("Invalid choice. Please enter 1 or 2.")


def download_playlist_by_link():
    playlist_uri = input("Enter the playlist link from spotify: ")
    sp = authenticate_spotify()
    playlist = sp.playlist_tracks(playlist_uri)
    
    for track in playlist['items']:
        song_name = track['track']['name']
        artist_name = track['track']['artists'][0]['name']
        query = f"{song_name} {artist_name}"

        youtube_id = search_youtube(query)

        if youtube_id:
            print(f"Downloading {query} from YouTube...")
            download_youtube_video(youtube_id, 'downloads', quality='137')


def download_song_by_name():
    song_name = input("Enter the song name: ")
    query = song_name
    youtube_id = search_youtube(query)

    print("Choose a download method:")
    print("1. Audio File")
    print("2. Video File")

    choice = input("Enter your choice (1 or 2): ")

    choiceSelected = {
        '1': download_youtube_audio,
        '2': download_youtube_video,
    }
    
    selected_method = choiceSelected.get(choice)
    
    if selected_method:
        video_quality = 'best' if choice == '2' else 'best'
        selected_method(youtube_id, 'downloads', quality=video_quality)
    else:
        print("Invalid choice. Please enter 1 or 2.")



def main():
    # Example usage of different download methods
    # download_song_by_link('https://open.spotify.com/track/4ZguAeEoNjipSbQFzfDsYI?si=6d698d0c1f854683')
    # download_playlist_by_link('your_spotify_playlist_uri')
    # download_song_by_name('Shape of You Ed Sheeran')
    
    print("Choose a download method:")
    print("1. Download by Spotify Song link")
    print("2. Download by Spotify playlist URI")
    print("3. Download by song name")

    choice = input("Enter your choice (1, 2, 3): ")

    choiceSelected = {
        '1': download_song_by_link,
        '2': download_playlist_by_link,
        '3': download_song_by_name,
    }

    selected_method = choiceSelected.get(choice)
    if selected_method:
        selected_method()
    else:
        print("Invalid choice. Please enter 1, 2, or 3.")

if __name__ == "__main__":
    main()
