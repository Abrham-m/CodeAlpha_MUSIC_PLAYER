document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audio-player");
  const playPauseButton = document.getElementById("play-pause");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const volumeControl = document.getElementById("volume");
  const playlistItems = document.getElementById("playlist-items");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  let playlist = [
    {
      title: "Perfect",
      artist: "Ed Sheeran",
      src: "./Ed Sheeran - Perfect (Official Music Video).mp3",
      category: "Pop",
      image: "./perfect.jpeg",
    },
    {
      title: "Dusk Till Dawn",
      artist: "Zayn ft Sia",
      src: "./ZAYN - Dusk Till Dawn (Official Video) ft. Sia.mp3",
      category: "pop",
      image: "./Till dawn dusk.jpeg",
    },
    {
      title: "Let Me Love You",
      artist: "Dj Snake ft Justin Bieber",
      src: "./DJ_Snake_-_Let_Me_Love_You_ft._Justin_Bieber_2.mp3",
      category: "electropop",
      image: "./let me love you.jpg",
    },
    {
      title: "Despacito",
      artist: "Luis Fonsi, Daddy Yankee ft Justin Bieber",
      src: "./Despacito_-_Luis_Fonsi,_Daddy_Yankee___Justin_Bieber_(Music_Video).mp3",
      category: "reggaeton",
      image: "./Despacito.jpg",
    },
    {
      title: "A Lie",
      artist: "French Montana ft. The Weeknd, Max B",
      src: "./French Montana - A Lie ft. The Weeknd, Max B.mp3",
      category: "Hip-Hop",
      image: "./a lie.jpg",
    },
  ];

  let currentSongIndex = 0;

  function loadSong(index) {
    const song = playlist[index];
    audioPlayer.src = song.src;
    audioPlayer.load();

    document.getElementById("track-title").textContent = song.title;
    document.getElementById("track-artist").textContent = song.artist;

    const albumCover = document.getElementById("album-cover");
    albumCover.src = song.image || "./default-cover.jpg";

    document.getElementById("current-time").textContent = "00:00";
    document.getElementById("total-time").textContent = "00:00";

    updatePlaylistView();
  }
  function updatePlaylistView(songs = playlist) {
    playlistItems.innerHTML = "";
    songs.forEach((song) => {
      const li = document.createElement("li");
      li.textContent = song.title;
      li.addEventListener("click", () => {
        // Find the index of the song in the original playlist
        const originalIndex = playlist.findIndex(s => s.title === song.title);
        currentSongIndex = originalIndex;
        loadSong(currentSongIndex);
        audioPlayer.play();
        updatePlayPauseButton();
      });
      if (playlist[currentSongIndex] === song) {
        li.style.fontWeight = "bold";
        li.style.color = "green";
      }
      playlistItems.appendChild(li);
    });
  }  function updatePlayPauseButton() {
    playPauseButton.textContent = audioPlayer.paused ? "Play" : "Pause";
  }

  playPauseButton.onclick = () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
    updatePlayPauseButton();
  };

  prevButton.onclick = () => {
    currentSongIndex =
      (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    updatePlayPauseButton();
  };

  nextButton.onclick = () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    updatePlayPauseButton();
  };

  volumeControl.oninput = (e) => {
    audioPlayer.volume = e.target.value;
  };

  searchButton.onclick = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPlaylist = playlist.filter(
      (song) =>
        song.title.toLowerCase().includes(searchTerm) ||
        song.category.toLowerCase().includes(searchTerm)
    );
    updatePlaylistView(filteredPlaylist);
  };
  // Initialize time display
  document.getElementById("current-time").textContent = "00:00";
  document.getElementById("total-time").textContent = "00:00";

  // Initialize the player
  loadSong(currentSongIndex);
  updatePlaylistView();

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  audioPlayer.addEventListener("timeupdate", updateTimeInfo);

  function updateTimeInfo() {
    const currentTimeElement = document.getElementById("current-time");
    const totalTimeElement = document.getElementById("total-time");

    currentTimeElement.textContent = formatTime(audioPlayer.currentTime);
    totalTimeElement.textContent = formatTime(audioPlayer.duration);
  }

  audioPlayer.oncanplay = function () {
    audioPlayer.play();
  };

  audioPlayer.addEventListener("loadedmetadata", function () {
    document.getElementById("total-time").textContent = formatTime(
      audioPlayer.duration
    );
  });

  audioPlayer.addEventListener("timeupdate", updateProgress);

  function updateProgress() {
    const progress = document.getElementById("progress");
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = percent + "%";
  }

  document.querySelector(".progress-bar").addEventListener("click", seek);

  function seek(e) {
    const percent = e.offsetX / this.offsetWidth;
    audioPlayer.currentTime = percent * audioPlayer.duration;
  }
});
