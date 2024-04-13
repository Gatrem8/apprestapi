"use strict";

exports.ok = function (values, res) {
  var data = {
    status: 200,
    values: values,
  };
  res.json(data);
  res.end();
};

exports.oknested = function (values, res) {
  const hasil = values.reduce((akumulasikan, item) => {
    if (akumulasikan[item.nama]) {
      const group = akumulasikan[item.nama];
      // Periksa apakah group.matakuliah sudah ada dan berisi array
      if (group.matakuliah && Array.isArray(group.matakuliah)) {
        group.matakuliah.push(item.matakuliah);
      } else {
        // Jika group.matakuliah belum ada atau tidak berisi array, buat array baru
        group.matakuliah = [group.matakuliah, item.matakuliah].filter(Boolean);
      }
    } else {
      akumulasikan[item.nama] = item;
      // // Buat group baru jika belum ada
      // akumulasikan[item.nama] = {
      //   nim: item.nim,
      //   nama: item.nama,
      //   jurusan: item.jurusan,
      //   // Buat array matakuliah dan tambahkan matakuliah pertama
      //   matakuliah: [item.matakuliah],
      // };
    }
    return akumulasikan;
  }, {});

  var data = {
    status: 200,
    values: hasil,
  };
  res.json(data);
  res.end();
};
