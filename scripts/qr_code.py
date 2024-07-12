import qrcode
from PIL import Image

def generate_qr_code(data, file_name, logo_path=None):
    # Create an instance of the QRCode class
    qr = qrcode.QRCode(
        version=1,  # controls the size of the QR Code
        error_correction=qrcode.constants.ERROR_CORRECT_H,  # higher error correction to ensure logo area is not critical
        box_size=10,  # controls how many pixels each “box” of the QR code is
        border=4,  # controls how many boxes thick the border should be
    )

    # Add data to the QR code
    qr.add_data(data)
    qr.make(fit=True)

    # Create an image from the QR code instance
    img = qr.make_image(fill='black', back_color='white').convert('RGB')

    if logo_path:
        logo = Image.open(logo_path)
        
        # Calculate the logo size, it should be small compared to the QR code
        box = (img.size[0] // 5, img.size[1] // 5)
        logo = logo.resize(box, Image.LANCZOS)
        
        # Calculate the position for the logo to be centered
        logo_position = ((img.size[0] - box[0]) // 2, (img.size[1] - box[1]) // 2)
        
        # Paste the logo into the QR code image
        img.paste(logo, logo_position, logo)
    
    # Save the image
    img.save(file_name)

    print(f"QR code generated and saved as {file_name}")

# Input data
data = "https://ape.store/base/0xda3d2a68cfe7e1588554aee8afd553f91a14647f"
file_name = "wfk_qr.png"
logo_path = "../assets/images/wfk_64x64.png"  # Replace with the path to your logo image

# Generate the QR code with logo
generate_qr_code(data, file_name, logo_path)
