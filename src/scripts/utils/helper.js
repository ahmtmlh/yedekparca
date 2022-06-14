function checkMediaFileSecure(mimeType){
    return mimeType.includes('image/')
}

module.exports = {
    checkMediaFileSecure
}