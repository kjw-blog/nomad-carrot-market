// JIT Compiler ( Just In Time Compiler : tailwindcss 3.0 의 기능으로 사용자의 입력에 따라 즉시 클래스를 만들어 css를 적용해준다. )

export default function jitCompiler() {
  return (
    <div className="dark:md:hover:bg-teal-400 bg-[url('/vercel.svg')]">
      <h1 className="text-[36px] text-[#6486e4]">Hello</h1>
    </div>
  );
}
