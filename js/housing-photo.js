'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#images');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var image = document.createElement('img');
        image.src = reader.result;
        image.width = '70';
        image.height = '70';
        image.alt = 'Фото жилья';

        var photoBlock = photoContainer.querySelector('.ad-form__photo:last-child');
        photoBlock.appendChild(image);

        var newPhotoBlock = photoBlock.cloneNode();
        photoContainer.appendChild(newPhotoBlock);
      });
    }

    reader.readAsDataURL(file);
  });
})();
