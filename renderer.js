const urlInput = document.getElementById('urlInput');
const chooseFolderButton = document.getElementById('chooseFolder');
const folderPathText = document.getElementById('folderPath');
const downloadAudioButton = document.getElementById('downloadAudio');
const downloadVideoButton = document.getElementById('downloadVideo');
const statusText = document.getElementById('statusText');

let outputFolder = null;

function setStatus(message, isError = false) {
  statusText.textContent = message;
  statusText.style.color = isError ? '#ff8585' : '#dbe9ff';
}

chooseFolderButton.addEventListener('click', async () => {
  const folder = await window.geminiApi.chooseOutputFolder();
  if (folder) {
    outputFolder = folder;
    folderPathText.textContent = `Output: ${folder}`;
    setStatus('Output folder selected.');
  }
});

async function download(type) {
  const url = urlInput.value.trim();
  if (!url) {
    setStatus('Please enter a YouTube URL.', true);
    return;
  }

  setStatus(`Starting ${type === 'audio' ? 'WAV audio' : 'MP4 video'} download...`);
  downloadAudioButton.disabled = true;
  downloadVideoButton.disabled = true;

  try {
    const result = await window.geminiApi.downloadMedia({ url, type, outputFolder });
    if (result.success) {
      setStatus(`Download complete. Check the selected folder or your Downloads directory.`);
    } else {
      setStatus(`Error: ${result.message}`, true);
    }
  } catch (error) {
    setStatus(`Error: ${error.message || error}`, true);
  } finally {
    downloadAudioButton.disabled = false;
    downloadVideoButton.disabled = false;
  }
}

downloadAudioButton.addEventListener('click', () => download('audio'));
downloadVideoButton.addEventListener('click', () => download('video'));
