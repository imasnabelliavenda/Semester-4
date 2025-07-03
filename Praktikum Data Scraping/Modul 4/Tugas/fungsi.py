import os
import requests

# Buat folder jika belum ada
def create_directory(folder_name):
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)

# Buat file baru kosong
def create_new_file(path):
    with open(path, 'w') as f:
        f.write("")

# Cek apakah file ada
def does_file_exist(path):
    return os.path.isfile(path)

# Tulis data ke file (append)
def write_to_file(path, data):
    with open(path, 'a') as file:
        file.write(data + '\n')

# Baca data dari file dan print ke terminal
def read_data(path):
    with open(path, 'rt') as file:
        for line in file:
            print(line.strip())

# Hapus isi file
def clear_file(path):
    with open(path, 'w') as f:
        pass

# Simpan gambar dari URL ke folder dan filename yang diberikan
def save_image(img_url, folder_path, file_name=None):
    if not file_name:
        file_name = img_url.split('/')[-1]
    create_directory(folder_path)
    response = requests.get(img_url)
    if response.status_code == 200:
        file_path = os.path.join(folder_path, file_name)
        with open(file_path, 'wb') as f:
            f.write(response.content)
        print(f'{file_name} berhasil disimpan pada direktori {folder_path}')
        return True