import Image from "next/image";

const FullWidthBanner = () => {
  return (
    <section className="mb-8 relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[500px] md:h-[600px]">
      <Image
        alt="Full Width Image"
        src="/watch_fossil.jpg"
        fill
        className="object-cover"
      />
    </section>
  );
};

export default FullWidthBanner;
