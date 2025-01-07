const monthNames = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const monthFormat = (date) => {
  // return new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
  return monthNames[date - 1];
};
