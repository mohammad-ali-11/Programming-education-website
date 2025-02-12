/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  plugins: [
    require('tailwindcss'),  // استفاده از require برای پلاگین
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [require('cssnano')] : [])  // استفاده از require برای cssnano
  ],
  theme: {
    extend: {
      fontFamily:{
        "Dana":"Dana",
        "IRANSansBlack":"IRANSans Black",
        "IRANSansBold":"IRANSans Bold",
        "IRANSansLight":"IRANSans Light",
        "IRANSansMedium":"IRANSans Medium",
        "IRANSansUltraLight":"IRANSans UltraLight",
        "IRANSans":"IRANSans",
      },
      color:{

      },
      boxShadow:{
        "normal":"0 1px 10px 0 rgba(0, 0, 0, 0.05)",
        "category":"0 0 13px 1px rgba(70, 72, 77, 0.08)",
        "category-ul":"0 0 6px  rgba(0, 0, 0, 0.2)",
        "box-info":"0 5px 30px rgba(70, 72, 77, 0.08)",
        "box-profile":"2px 2px 20px #00000021",
        "box-register":"0 2px 12px rgba(31, 189, 80, 36%)",
        "textarea":"0 1px 3px rgba(0, 0, 0, 0.07)",
        "login":"0 6px 20px rgba(168, 172, 185, 0.3)",
      },
      container:{
        center:true,
        padding:{
          DEFAULT: '1rem',
          lg:"0.625rem"
        }
    },
    screens: {
      'xs':'480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
   
    },
  },
  plugins: [],
}

}