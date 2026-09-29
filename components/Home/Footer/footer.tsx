import { Box, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";

import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        wdith: "100%",
        px: 4,
        py: 2,
        display: "flex",
        justifyContent:{xs:'center',sm:'center',md:'space-between'},
        alignItems:'center',
        flexDirection:{xs:'column',sm:'column',md:'row'},
        gap:4
      }}

    >
      <Stack direction={"row"} sx={{alignItems:'center',justifyContent:'center'}}>
        <Image
          alt="App Icon"
          src="/images/app_icon.png"
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
            Task
            <Box component={"span"} sx={{ color: "text.primary" }}>
              Flow
            </Box>
          </Typography>
          <Typography
            className="disabled"
            sx={{
              fontSize: { xs: "11px", sm: "13px", md: "15px" },
            }}
          >
            Organize ● Collaborate ● Achieve
          </Typography>
        </Stack>
      </Stack>

      <Stack direction={"row"} spacing={2}>
        {["Home", "Features", "Pricing", "About"].map((T, i) => (
          <Typography className="option disabled" component={'a'} href={`#${T}`} key={i} sx={{fontSize:'13px','&:hover':{
            cursor:'pointer'
          }}}>
            {T}
          </Typography>
        ))}
      </Stack>

      <Stack spacing={1} sx={{alignItems:'center',justifyContent:'center'}}>
        <Stack direction={'row'}>
          <IconButton sx={{transition:'transform .3s ease','&:hover':{
            background:'none',
            transform:'translateY(-10%)'
          }}}>
            {" "}
            <Link href={"https://github.com/fellahiabdelghafour-max"}>
              <GitHubIcon className="disabled" sx={{filter:'drop-border(solid red 1px)'}}/>
            </Link>
          </IconButton>
                    <IconButton sx={{transition:'transform .3s ease','&:hover':{
            background:'none',
            transform:'translateY(-10%)'
          }}}>
            {" "}
            <Link href={"https://www.instagram.com/_abdelghafour__/"}>
              <InstagramIcon className="disabled"/>
            </Link>
          </IconButton>
                    <IconButton sx={{transition:'transform .3s ease','&:hover':{
            background:'none',
            transform:'translateY(-10%)'
          }}}>
            {" "}
            <Link href={"facebook.com"}>
              <FacebookIcon className="disabled"/>
            </Link>
          </IconButton>
                    <IconButton sx={{transition:'transform .3s ease','&:hover':{
            background:'none',
            transform:'translateY(-10%)'
          }}}>
            {" "}
            <Link href={"http://www.linkedin.com/in/fellahiabdelghafour"}>
              <LinkedInIcon className="disabled"/>
            </Link>
          </IconButton>
        </Stack>
        <Typography
          sx={{color:'white'}}
          className="disabled"
        >
          © 2026 TaskFlow. Abdelghafour
        </Typography>
      </Stack>
    </Box>
  );
}
