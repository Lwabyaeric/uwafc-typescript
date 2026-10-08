import logoImg from '../../assets/f-icon.png';

export default function Logo() {
  return (
    <img 
      src={logoImg} 
      className="w-full h-full object-contain" 
      alt="UWA FC Official Crest"
      style={{ aspectRatio: '1/1' }}
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.currentTarget;
        target.onerror = null; 
        target.src = "https://placeholder.com";
      }}
    />
  );
}
