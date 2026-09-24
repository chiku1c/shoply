export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-[#faf7ff]">
      <img
        src="/shoply_clothes_infinity_loader.gif"
        alt="Shoply loading"
        className="h-full w-full object-cover"
      />

      {/* <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-sm font-medium text-gray-600">
          Loading your shopping experience...
        </p>
      </div> */}
    </div>
  );
}