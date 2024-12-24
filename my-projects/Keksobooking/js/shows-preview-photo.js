const FILE_TYPE = ['jpg', 'jpeg', 'png'];

const showsPreviewPhoto = (field, previewBlock) => {
  const file = field.files[0];
  if (!file) {
    return;
  }
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPE.some((expansion) => fileName.endsWith(expansion));
  if (matches) {
    previewBlock.src = URL.createObjectURL(file);
  }
};

export { showsPreviewPhoto, FILE_TYPE };
