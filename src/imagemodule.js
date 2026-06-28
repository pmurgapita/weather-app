


export async function getDynamicImage(imageName) {
    try {
        const module = await import(
            `./assets/${imageName}`
        );
        return module.default;
    } catch (error) {
        console.error(`Image layout error: ${imageName} not found.`, error);
        return null;
    }
}