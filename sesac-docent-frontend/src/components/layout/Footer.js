export const Footer = () => {
  return (
    <div className="flex justify-center w-full h-min-[510px] h-fit py-8 bg-zinc-100 border-t border-black border-solid">
      <div className="flex w-full max-w-[1100px] h-full mx-8">
        <section className="w-full max-w-[275px] h-[450px]">
          <p className="text-xl font-bold">Visit Us</p>
        </section>
        <section className="w-full max-w-[275px] h-[450px]">
          <p className="text-xl font-bold">Connect with Us</p>
        </section>
        <section className="w-full max-w-[275px] h-[450px]">
          <p className="text-xl font-bold">Sign up for MFA Mail</p>
        </section>
        <section className="w-full max-w-[275px] h-[450px]">
          <p className="text-xl font-bold">SNS</p>
        </section>
      </div>
    </div>
  );
};
