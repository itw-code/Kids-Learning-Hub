/**
 * games/spelling/imagePreloader.ts
 * Modern Off-Main-Thread Image Decoding and Cache manager
 * 
 * Bypasses iPad Safari main-thread image decompression stutters by leveraging HTMLImageElement.decode()
 */

export class ImagePreloader {
  private static cache: Record<string, HTMLImageElement> = {};

  /**
   * Preloads and decodes an image off the main thread.
   * Resolves when the image is fully decoded and ready to render without stuttering.
   * @param {string} src 
   * @returns {Promise<HTMLImageElement>}
   */
  public static async preloadAndDecode(src: string): Promise<HTMLImageElement> {
    if (this.cache[src]) {
      return this.cache[src];
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;

      // Handle loading success
      img.onload = async () => {
        try {
          if ('decode' in img) {
            // Forces off-main-thread image decompression
            await img.decode();
          }
          this.cache[src] = img;
          resolve(img);
        } catch (err) {
          console.warn(`[ImagePreloader] Failed to decode image: ${src}`, err);
          // Resolve with the image anyway if decode is not supported or fails
          resolve(img);
        }
      };

      // Handle loading failure
      img.onerror = (err) => {
        console.error(`[ImagePreloader] Failed to load image: ${src}`, err);
        reject(err);
      };
    });
  }

  /**
   * Preloads a batch of images.
   * @param {string[]} srcs 
   * @returns {Promise<HTMLImageElement[]>}
   */
  public static preloadBatch(srcs: string[]): Promise<HTMLImageElement[]> {
    const promises = srcs.map(src => this.preloadAndDecode(src).catch(() => null));
    return Promise.all(promises).then(results => results.filter((img): img is HTMLImageElement => img !== null));
  }
}
