import React from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
  Paper,
  alpha,
} from "@mui/material";
import {
  MenuBook,
  LocalOffer,
  HeadsetMic,
  ArrowForward,
  Star,
  Bookmark,
  PlayArrowRounded,
} from "@mui/icons-material";

const FEATURES_DATA = [
  {
    title: "مكتبة لا حدود لها",
    desc: "آلاف الكتب المنتقاة بعناية بانتظار أن تكتشفها وتغوص في عوالمها.",
    icon: <MenuBook sx={{ fontSize: 36, color: "#fff" }} />,
    color: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
  },
  {
    title: "عروض مخصصة لك",
    desc: "خصومات حصرية وباقات قراءة مصممة خصيصاً لتناسب ذوقك.",
    icon: <LocalOffer sx={{ fontSize: 36, color: "#fff" }} />,
    color: "linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)",
  },
  {
    title: "مساعدة فورية",
    desc: "فريقنا متواجد على مدار الساعة لجعل تجربة قراءتك خالية من العوائق.",
    icon: <HeadsetMic sx={{ fontSize: 36, color: "#fff" }} />,
    color: "linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)",
  },
];

const POPULAR_BOOKS_DATA = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    rating: "4.8",
    category: "كلاسيك",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    rating: "4.9",
    category: "دراما",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "1984 George Orwell",
    author: "George Orwell",
    rating: "4.7",
    category: "خيال علمي",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
  },
];

const HeroSection = () => (
  <Box
    sx={{
      mt: 4,
      mb: 10,
      p: { xs: 4, md: 8 },
      borderRadius: 8,
      position: "relative",
      overflow: "hidden",
      // خلفية جذابة مدمجة مع تدرجات
      background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
      boxShadow: "0 30px 60px rgba(0,0,0,0.05)",
      border: "1px solid rgba(255,255,255,0.8)",
    }}
  >
    {/* دوائر ديكور عائمة في الخلفية للتجميل */}
    <Box
      sx={{
        position: "absolute",
        top: "-10%",
        right: "-5%",
        width: 300,
        height: 300,
        background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0) 70%)",
        borderRadius: "50%",
        zIndex: 0,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        bottom: "-10%",
        left: "-5%",
        width: 400,
        height: 400,
        background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(236,72,153,0) 70%)",
        borderRadius: "50%",
        zIndex: 0,
      }}
    />

    <Grid container spacing={6} alignItems="center" sx={{ position: "relative", zIndex: 1 }}>
      <Grid item xs={12} md={7}>
        <Chip
          label="✨ إصدارات 2026 وصلت"
          sx={{
            mb: 3,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            fontWeight: 800,
            px: 1,
            boxShadow: "0 4px 15px rgba(118, 75, 162, 0.3)",
          }}
        />
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            mb: 2,
            lineHeight: 1.2,
            // نص متدرج
            background: "linear-gradient(to right, #1a202c, #4a5568)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-1px",
          }}
        >
          اكتشف عالماً جديداً<br /> بين طيات الكتب
        </Typography>
        <Typography variant="h6" sx={{ mb: 5, color: "text.secondary", fontWeight: 400, lineHeight: 1.8, maxWidth: "90%" }}>
          مكتبتك الشخصية الآن أكثر ذكاءً. تصفح آلاف الكتب، احصل على اقتراحات مخصصة، وعش متعة القراءة بشكل لم يسبق له مثيل.
        </Typography>
        
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            sx={{
              background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
              borderRadius: "50px",
              px: 4,
              py: 1.8,
              fontWeight: 800,
              fontSize: "1.1rem",
              boxShadow: "0 10px 25px rgba(236, 72, 153, 0.4)",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 15px 35px rgba(236, 72, 153, 0.6)",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            ابدأ رحلتك الآن
          </Button>
          <Button
            variant="text"
            size="large"
            startIcon={<PlayArrowRounded sx={{ fontSize: "2rem !important" }} />}
            sx={{
              color: "text.primary",
              fontWeight: 700,
              fontSize: "1.1rem",
              px: 3,
              borderRadius: "50px",
              "&:hover": { background: "rgba(0,0,0,0.05)" },
            }}
          >
            شاهد الجولة
          </Button>
        </Box>
      </Grid>
      
      <Grid item xs={12} md={5} sx={{ display: { xs: "none", md: "block" } }}>
        <Box sx={{ position: "relative" }}>
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop"
            sx={{
              width: "100%",
              height: "450px",
              objectFit: "cover",
              borderRadius: "30px 100px 30px 30px",
              boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
              transform: "rotate(2deg)",
              transition: "all 0.5s ease",
              "&:hover": { transform: "rotate(0deg) scale(1.03)" },
            }}
          />
          <Paper
            sx={{
              position: "absolute",
              bottom: 40,
              left: -30,
              p: 2,
              borderRadius: 4,
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(15px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              gap: 2,
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            <Box sx={{ bgcolor: "#FFD700", p: 1, borderRadius: 2, display: "flex" }}>
              <Star sx={{ color: "white" }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>+500 كتاب جديد</Typography>
              <Typography variant="caption" color="text.secondary">تمت إضافتها هذا الأسبوع</Typography>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

const FeatureCard = ({ title, desc, icon, color }) => (
  <Paper
    elevation={0}
    sx={{
      p: 4,
      height: "100%",
      borderRadius: 6,
      background: "#ffffff",
      border: "1px solid rgba(0,0,0,0.05)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", // حركة ارتدادية ناعمة
      "&:hover": {
        transform: "translateY(-12px)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
      },
    }}
  >
    <Box
      sx={{
        width: 72,
        height: 72,
        mb: 3,
        borderRadius: 4,
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      }}
    >
      {icon}
    </Box>
    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, color: "#1a202c" }}>
      {title}
    </Typography>
    <Typography variant="body1" sx={{ color: "#718096", lineHeight: 1.7 }}>
      {desc}
    </Typography>
  </Paper>
);

const TrendingBooksGrid = ({ books }) => (
  <Box sx={{ mt: 10 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 5 }}>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 900, color: "#1a202c", mb: 1 }}>
          الأكثر رواجاً 🔥
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          الكتب التي يقرؤها العالم الآن.
        </Typography>
      </Box>
      <Button
        endIcon={<ArrowForward />}
        sx={{ fontWeight: 800, color: "primary.main", "&:hover": { background: "transparent", letterSpacing: "1px" }, transition: "all 0.3s" }}
      >
        اكتشف المزيد
      </Button>
    </Box>

    <Grid container spacing={4}>
      {books.map((book, idx) => (
        <Grid item xs={12} sm={6} md={4} key={idx}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 6,
              background: "#fff",
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.05)",
              "&:hover .book-image": { transform: "scale(1.08)" },
              "&:hover": { boxShadow: "0 20px 40px rgba(0,0,0,0.1)" },
              transition: "all 0.4s ease",
            }}
          >
            <Box sx={{ position: "relative", overflow: "hidden" }}>
              <CardMedia
                className="book-image"
                component="img"
                height="320"
                image={book.image}
                alt={book.title}
                sx={{ objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: "50%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                }}
              />
              <Chip
                label={book.category}
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  bgcolor: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  color: "white",
                  fontWeight: 800,
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  bgcolor: "rgba(255,255,255,0.9)",
                  color: "#e53e3e",
                  "&:hover": { bgcolor: "white", transform: "scale(1.1)" },
                  transition: "all 0.2s",
                }}
              >
                <Bookmark />
              </IconButton>
              
              {/* التقييم يظهر داخل الصورة من الأسفل */}
              <Box sx={{ position: "absolute", bottom: 15, left: 20, display: "flex", alignItems: "center", gap: 0.5 }}>
                 <Star sx={{ color: "#FFD700", fontSize: 22 }} />
                 <Typography variant="h6" sx={{ fontWeight: 800, color: "white" }}>{book.rating}</Typography>
              </Box>
            </Box>

            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: "#2d3748" }}>
                {book.title}
              </Typography>
              <Typography variant="body1" sx={{ color: "#a0aec0", mb: 3, fontWeight: 500 }}>
                {book.author}
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  borderRadius: "50px",
                  py: 1.2,
                  fontWeight: 800,
                  borderWidth: "2px",
                  "&:hover": { borderWidth: "2px" },
                }}
              >
                قراءة التفاصيل
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default function HomePageCustomer() {
  return (
    <Box sx={{ width: "100%", py: 4, px: 2, bgcolor: "#f7fafc", minHeight: "100vh", fontFamily: "'Tajawal', sans-serif" }}>
      <Container maxWidth="xl">
        <HeroSection />

        <Grid container spacing={4}>
          {FEATURES_DATA.map((feature, index) => (
            <Grid item key={index} xs={12} md={4}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>

        <TrendingBooksGrid books={POPULAR_BOOKS_DATA} />
      </Container>
    </Box>
  );
}