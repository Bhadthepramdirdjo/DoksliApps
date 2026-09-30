export type Folder = { id: string; name: string; restricted: boolean }
export type DocVersion = { v: number; date: string; uploader: string; size: number; note: string }
export type Doc = {
  id: string; name: string; folderId: string; category: string
  owner: string; date: string; size: number; tags: string[]
  versions: DocVersion[]; deletedAt: string | null
}
export type Audit = { id: string; user: string; action: string; object: string; ip: string; time: string }

export const folders: Folder[] = [
  { id: 'f1', name: 'Kontrak', restricted: false },
  { id: 'f2', name: 'Keuangan', restricted: false },
  { id: 'f3', name: 'SDM', restricted: false },
  { id: 'f4', name: 'Legal', restricted: true },
  { id: 'f5', name: 'Korespondensi', restricted: false },
]

function v(n: number, date: string, uploader: string, size: number, note: string): DocVersion {
  return { v: n, date, uploader, size, note }
}
function doc(id: string, name: string, folderId: string, category: string, owner: string, date: string, size: number, tags: string[], versions: DocVersion[]): Doc {
  return { id, name, folderId, category, owner, date, size, tags, versions, deletedAt: null }
}

// 6 dokumen sample — 1 per kategori (Kontrak, Keuangan, SDM, Legal, Korespondensi + 1 extra)
export const documents: Doc[] = [
  doc('d1','Kontrak Sewa Gedung Cikarang 2026','f1','Kontrak','Udin Nugraha','15 Jan 2026',2450,['sewa','gedung'],[v(1,'15 Jan 2026','Taufik Nugraha',2450,'Unggahan awal')]),
  doc('d4','Laporan Keuangan Kuartal I 2026','f2','Keuangan','Anas','5 Apr 2026',3870,['laporan','kuartal'],[v(1,'2 Apr 2026','Anas',3600,'Unggahan awal'),v(2,'4 Apr 2026','Anas',3750,'Revisi angka pajak'),v(3,'5 Apr 2026','Anas',3870,'Perbaikan format tabel')]),
  doc('d7','SK Pengangkatan Karyawan Batch 12','f3','SDM','Clara Hutagalung','8 Jan 2026',1540,['sk','karyawan'],[v(1,'8 Jan 2026','Clara Hutagalung',1540,'Unggahan awal')]),
  doc('d10','Somasi Sengketa Lahan Bekasi','f4','Legal','Taufik Nugraha','1 Des 2025',2130,['somasi','sengketa'],[v(1,'1 Des 2025','Taufik Nugraha',2130,'Unggahan awal')]),
  doc('d12','Surat Masuk Dinas Perpustakaan Kearsipan','f5','Korespondensi','Nurhasan','28 Feb 2026',210,['surat-masuk'],[v(1,'28 Feb 2026','Nurhasan',210,'Unggahan awal')]),
  // sampah sample
  { ...doc('d14','Draft Lama Kontrak Vendor (dibatalkan)','f1','Kontrak','Dewi Larasati','3 Okt 2025',540,['draft'],[v(1,'3 Okt 2025','Dewi Larasati',540,'Unggahan awal')]), deletedAt: '18 Sep 2026' },
]

export const auditLog: Audit[] = [
  { id:'a11', user:'Clara Hutagalung', action:'Lihat dokumen', object:'SK Pengangkatan Karyawan Batch 12', ip:'10.20.4.18', time:'21 Sep 2026, 08:01' },
  { id:'a10', user:'Nurhasan', action:'Unduh dokumen', object:'Surat Masuk Dinas Perpustakaan Kearsipan', ip:'10.20.4.44', time:'21 Sep 2026, 07:35' },
  { id:'a6', user:'Anas', action:'Unggah versi baru', object:'Laporan Keuangan Kuartal I 2026 v3', ip:'10.20.4.30', time:'20 Sep 2026, 14:47' },
  { id:'a4', user:'Anas', action:'Lihat dokumen', object:'Laporan Keuangan Kuartal I 2026', ip:'10.20.4.30', time:'20 Sep 2026, 10:05' },
  { id:'a2', user:'Fadhil Maulana', action:'Unggah dokumen', object:'Kontrak Sewa Gedung Cikarang 2026', ip:'10.20.4.11', time:'20 Sep 2026, 08:14' },
  { id:'a8', user:'Dewi Larasati', action:'Pindahkan ke tempat sampah', object:'Draft Lama Kontrak Vendor (dibatalkan)', ip:'10.20.4.22', time:'18 Sep 2026, 11:03' },
]

export const fmtSize = (kb: number) => kb >= 1024 ? (kb/1024).toFixed(1)+' MB' : Math.round(kb)+' KB'
export const totalSize = () => documents.filter(d=>!d.deletedAt).reduce((s,d)=> s + (d.versions[d.versions.length-1]?.size ?? d.size), 0)
