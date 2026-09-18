"use client";
import { Box, Button, Card, Rating, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useAuth } from "../../context/authContext";

gsap.registerPlugin(ScrollTrigger);

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [divider, setDivider] = useState(1);
  const stopTouch = useRef<boolean>(false);
  const authContext = useAuth();
  const indexes =
    Math.ceil(testimonials.length / divider) > 5
      ? 5
      : Math.ceil(testimonials.length / divider);
  const elementRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(elementRef.current, {
        start: "top 99%",
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 100,
            opacity: 0,
            duration: 0.5,
            stagger: 0.2,
            ease: "power3.out",
          }),
        once: true,
      });
    });

    function DividerVlue() {
      setDivider(
        window.innerWidth >= 900 ? 3 : window.innerWidth >= 600 ? 2 : 1,
      );
      console.log(divider);
      console.log(indexes);
    }
    DividerVlue();

    window.addEventListener("resize", () => DividerVlue);

    return () => {
      window.removeEventListener("resize", () => DividerVlue);
      ctx.revert();
    };
  }, [divider, indexes]);

  if (!authContext) return;
  const { loading, user } = authContext;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        py: 4,
        px: 4,
        flexDirection: "column",
      }}
    >
      <Typography
        ref={(e: HTMLElement) => {
          elementRef.current[0] = e;
        }}
        className="special-title"
        sx={{
          fontSize: { xs: "11px", sm: "15px", md: "13px" },
          color: "#00aaff !important",
        }}
      >
        WHAT OUR USERS SAY
      </Typography>

      <Typography
        ref={(e: HTMLElement) => {
          elementRef.current[1] = e;
        }}
        sx={{
          fontSize: { xs: 20, sm: 20, md: 20, lg: 30 },
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        Trusted by Teams and Individuals
      </Typography>

      <Typography
        ref={(e: HTMLElement) => {
          elementRef.current[2] = e;
        }}
        className="disabled"
        sx={{
          fontSize: { xs: "11px", sm: "15px", md: "13px" },
          textAlign: "center",
        }}
      >
        See what our users have to say about their experience with TaskFlow
      </Typography>

      <Box
        ref={(e: HTMLElement) => {
          elementRef.current[3] = e;
        }}
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "300px",
          overflowX: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          direction="row"
          spacing={{ xs: 0, sm: "5.1%", md: "2.33%" }}
          sx={{
            position: "absolute",
            transform: `translateX(${-index * 100}%)`,
            width: "100%",
            transition: "transform .7s ease",
          }}
          onPointerMove={(e) => {
            if (!stopTouch.current && e.pointerType === "touch") {
              if (e.movementX < 0 && index < indexes - 1) {
                setIndex((p) => p + 1);

                stopTouch.current = true;
                setTimeout(() => {
                  stopTouch.current = false;
                }, 700);
              } else if (e.movementX > 0 && index > 0) {
                setIndex((p) => p - 1);

                stopTouch.current = true;
                setTimeout(() => {
                  stopTouch.current = false;
                }, 700);
              }
            }
          }}
        >
          {testimonials.map((T, i) => (
            <Card
              key={i}
              sx={{
                flex: "0 0 auto",
                width: { xs: "100%", sm: "45%", md: "31%" },
                overflow: "hidden",
                p: 3,
              }}
            >
              <Stack
                direction={"row"}
                spacing={1}
                sx={{ alignItems: "center" }}
              >
                <Image
                  alt="use-Image"
                  src="/images/user.png"
                  width={40}
                  height={40}
                />
                <Stack>
                  <Typography
                    sx={{
                      fontSize: { xs: "11px", sm: "15px", md: "18px" },
                      color: "text.secondary",
                    }}
                  >
                    {T.name}
                  </Typography>
                  <Typography
                    className="disabled"
                    sx={{ fontSize: { xs: "11px", sm: "15px", md: "13px" } }}
                  >
                    {T.job}
                  </Typography>
                </Stack>
              </Stack>
              <Rating value={T.rating} readOnly />
              <Typography
                className="disabled"
                sx={{ fontSize: { xs: "11px", sm: "15px", md: "13px" } }}
              >
                <Box component={"span"} sx={{ color: "#00aeff" }}>
                  (⊙_◎){" "}
                </Box>
                {T.review}
              </Typography>
            </Card>
          ))}
        </Stack>
      </Box>
      <Stack
        ref={(e: HTMLElement | null) => {
          if (e) {
            elementRef.current[5] = e;
          }
        }}
        direction={"row"}
        sx={{ justifyContent: "center", alignItems: "center" }}
        spacing={1}
      >
        {Array(indexes)
          .fill(0)
          .map((_, i) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                "&:hover": { cursor: "pointer" },
                fontSize: `${40 - (index > i ? index - i : index < i ? i - index : 0) * 3}px`,
                color: index === i ? "text.primary" : `#00d9ff45`,
                width: 14,
                height: 14,
              }}
              onClick={() => setIndex(i)}
              key={i}
            >
              ●
            </Box>
          ))}
      </Stack>
      <Box
        ref={(e: HTMLElement | null) => {
          if (e) {
            elementRef.current[6] = e;
          }
        }}
      >
        <Button
          variant="outlined"
          sx={{
            borderColor: "#00d5ff",
            color: "text.secondary",
            gap: "2",
            display: "flex",
            alignItems: "center",
            width: "200px",
            justifyContent: "space-between",
          }}
          fullWidth
        >
          <GridViewOutlinedIcon sx={{ color: "#00d5ff" }} />
          View All Reviews{" "}
          <ArrowForwardOutlinedIcon sx={{ color: "info.main" }} />
        </Button>
      </Box>
      <Box
        ref={(e: HTMLElement | null) => {
          if (e) {
            elementRef.current[8] = e;
          }
        }}
        sx={{ width: "100%" }}
      >
        <Card
          sx={{
            backgroundImage: "url(/images/reviewsBG.png)",
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            alignItems: "center",
            justifyContent: { xs: "center", sm: "center", md: "space-between" },
            gap: 6,
          }}
        >
          <Stack spacing={{ xs: 3, sm: 3, md: 1 }}>
            <Typography
              className="special-title"
              sx={{
                maxWidth: "300px",
                textAlign: "center",
                fontSize: { xs: "11px", sm: "15px", md: "13px" },
              }}
            >
              READY TO GET STARTED
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: 20, sm: 20, md: 20, lg: 30 },
              }}
            >
              Start Your Porductivity journey Today
            </Typography>
            <Typography
              className="disabled"
              sx={{ fontSize: { xs: "11px", sm: "15px", md: "13px" } }}
            >
              Join TaskFlow and take control of your tasks, your time and your
              goals.
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <Button variant="contained" sx={{ display: user ? "none" : "" }} loading= {loading}>
              Register Now
            </Button>
            <Button href="#Home" variant="outlined" color="secondary">
              Learn More
            </Button>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
}

const testimonials = [
  {
    name: "Ahmed Benali",
    job: "Developer",
    rating: 4,
    review:
      "TaskFlow has completely changed the way I manage my work. The clean interface and powerful features are exactly what I needed.",
  },
  {
    name: "Sara Kaddof",
    job: "Designer",
    rating: 5,
    review:
      "I love the calendar view and the team collaboration features. It keeps our team organized and productive.",
  },
  {
    name: "Yassine Farah",
    job: "Student",
    rating: 1,
    review:
      "Simple, fast and reliable. I use it for both my studies and personal projects. Highly recommended!",
  },
  {
    name: "Lina Djebari",
    job: "Product Manager",
    rating: 3,
    review:
      "Our team's productivity jumped after switching to TaskFlow. The real-time updates make collaboration effortless.",
  },
  {
    name: "Omar Belkacem",
    job: "Freelancer",
    rating: 4,
    review:
      "Great tool for managing multiple client projects at once. The multi-view feature is a game changer for my workflow.",
  },
  {
    name: "Nour Amrani",
    job: "Marketing Lead",
    rating: 2,
    review:
      "TaskFlow helped our marketing team stay on top of every campaign deadline. The reminders alone are worth it.",
  },
  {
    name: "Karim Selmi",
    job: "Software Engineer",
    rating: 5,
    review:
      "Clean UI, fast performance, and cross-device sync works flawlessly. Exactly what a task manager should be.",
  },
  {
    name: "Amina Cherif",
    job: "Teacher",
    rating: 4,
    review:
      "I use TaskFlow to organize my lesson plans and grading schedule. It's intuitive enough that I didn't need a tutorial.",
  },
  {
    name: "Yacine Boudiaf",
    job: "Entrepreneur",
    rating: 5,
    review:
      "Running a small business means juggling a hundred tasks a day. TaskFlow's dashboard gives me a clear overview instantly.",
  },
  {
    name: "Meriem Haddad",
    job: "UX Researcher",
    rating: 5,
    review:
      "The analytics and insights section gives me exactly the data I need to improve my personal productivity habits.",
  },
  {
    name: "Bilal Rahmani",
    job: "Team Lead",
    rating: 4,
    review:
      "Assigning tasks to my team and tracking progress has never been easier. The notifications keep everyone accountable.",
  },
  {
    name: "Salma Ouali",
    job: "Graphic Designer",
    rating: 5,
    review:
      "I switched from three different apps to just TaskFlow. Everything I need is finally in one place.",
  },
  {
    name: "Anis Bouzid",
    job: "Data Analyst",
    rating: 5,
    review:
      "Reliable, secure, and genuinely easy to use. The 99.9% uptime claim has held true every single time I've needed it.",
  },
];
