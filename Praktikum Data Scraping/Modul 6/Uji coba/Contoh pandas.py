import pandas as pd

daftar_nilai = [10, 20, 30, 40]
my_series = pd.Series(daftar_nilai)
print(my_series)

my_dict = {'a': 100, 'b': 200, 'c': 300}
my_series = pd.Series(my_dict)
print(my_series)