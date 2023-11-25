class CommonUtils {
    static isNumber1(number) {
        if (number === 1) return true;
        return false;
    }

    static getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (e) => reject(e);

        })

    }

    static encodeBase64(image) {
        return new Buffer(image, 'base64').toString('binary');
    }


}

export default CommonUtils;