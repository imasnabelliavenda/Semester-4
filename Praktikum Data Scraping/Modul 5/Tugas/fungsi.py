import os

#create directory
def create_directory(folder_name):
    os.makedirs(folder_name, exist_ok=True)

#membuat file baru
def create_new_file(file_path):
    with open(file_path, 'w', encoding='utf-8') as f:
        pass

# cek file ada / tidak
def does_file_exist(file_path):
    return os.path.exists(file_path)

# menulis data ke file
def write_to_file(file_path, content):
    with open(file_path, 'a', encoding='utf-8') as f:
        f.write(content + '\n')

# menampilkan data di terminal
def read_data(path):
    with open(path, 'rt') as file:
        for line in file:
            print(line.replace("\n", ""))

# menghapus data 
def clear_file(path):
    f = open(path,'w')
    f.close()