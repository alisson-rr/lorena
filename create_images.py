from PIL import Image, ImageDraw, ImageFont
import os

# Create directories if they don't exist
os.makedirs('assets', exist_ok=True)
os.makedirs('src/assets', exist_ok=True)
os.makedirs('src/assets/fonts', exist_ok=True)

# Create solid color images for placeholders
def create_placeholder(path, width, height, color):
    img = Image.new('RGB', (width, height), color)
    img.save(path, 'PNG')

# Create app icons
create_placeholder('assets/icon.png', 512, 512, (156, 0, 226))
create_placeholder('assets/splash.png', 1284, 2778, (156, 0, 226))
create_placeholder('assets/adaptive-icon.png', 512, 512, (156, 0, 226))
create_placeholder('assets/favicon.png', 48, 48, (156, 0, 226))

# Create background image with gradient effect
background = Image.new('RGB', (375, 812), (242, 226, 222))
background.save('src/assets/background.jpg', 'JPEG')

# Create logo placeholder
logo = Image.new('RGBA', (147, 40), (255, 255, 255, 0))
draw = ImageDraw.Draw(logo)
draw.rectangle([0, 0, 146, 39], fill=(255, 255, 255, 255))
logo.save('src/assets/logo.png', 'PNG')

# Create decorative elements
elementos03 = Image.new('RGBA', (170, 170), (255, 255, 255, 50))
elementos03.save('src/assets/elementos-03.png', 'PNG')

elementos04 = Image.new('RGBA', (202, 202), (255, 255, 255, 50))
elementos04.save('src/assets/elementos-04.png', 'PNG')

print("Images created successfully!")