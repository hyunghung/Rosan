from rembg import remove
from PIL import Image

input = Image.open('logo-colored-blue.png')

output = remove(input)

output.save('logo-colored-blue-removed.png')