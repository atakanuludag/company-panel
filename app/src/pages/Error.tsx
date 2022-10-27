import PageMessage from '@/components/PageMessage'

export default function ErrorPage() {
  return (
    <PageMessage
      type="error"
      title="Ağ Hatası"
      description="Web servise erişilemiyor. Lütfen internet ayarlarınızı kontrol edin yada
    sistem yöneticisiyle iletişime geçiniz."
      buttonShow
      buttonText="Sayfayı Yenile"
    />
  )
}
