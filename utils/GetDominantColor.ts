// Function to get the two dominant colors from an image URL
export async function getDominantColorsFromImageUrl(imageUrl: string): Promise<number[][]> {
  // Load the image
  const imageElement: HTMLImageElement = await loadImage(imageUrl);

  // Create a canvas to extract image data
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Canvas context not supported');
  }

  canvas.width = imageElement.width;
  canvas.height = imageElement.height;

  // Draw the image on the canvas
  ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height);

  // Extract image data
  const imageData: Uint8ClampedArray = ctx.getImageData(0, 0, imageElement.width, imageElement.height).data;

  // Count the occurrence of each color
  const colorCounts: { [key: string]: number } = {};
  for (let i = 0; i < imageData.length; i += 4) {
    const color = `${imageData[i]},${imageData[i + 1]},${imageData[i + 2]}`;
    colorCounts[color] = (colorCounts[color] || 0) + 1;
  }

  // Find the two dominant colors
  const dominantColors: number[][] = [];
  for (let j = 0; j < 2; j++) {
    let maxCount = 0;
    let dominantColor: number[] | null = null;
    for (const color in colorCounts) {
      if (colorCounts[color] > maxCount) {
        maxCount = colorCounts[color];
        dominantColor = color.split(',').map(Number);
      }
    }
    if (dominantColor) {
      dominantColors.push(dominantColor);
      delete colorCounts[dominantColor.join(',')];
    }
  }

  // Return the two dominant colors
  return dominantColors;
}

// Helper function to load an image
function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}