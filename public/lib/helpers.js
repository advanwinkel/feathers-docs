// Helper function for converting dataurl to blob, so it can be saved using FileSaver.js
//(from: http://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript)
export function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}