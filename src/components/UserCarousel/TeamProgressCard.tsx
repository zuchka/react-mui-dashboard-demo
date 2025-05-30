import { Box, Typography, Avatar, Card } from "@mui/material";

const TeamProgressCard = () => {
  const teamMembers = [
    {
      name: "John Carter",
      email: "contact@sophiemoore.com",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/YJIGb4i01jvw0SRdL5Bt/300129fe3be7a6564cb775553f1f1a895db4261c?placeholderIfAbsent=true",
      progress: "60%",
    },
    {
      name: "Sophie Moore",
      email: "contact@sophiemoore.com",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/YJIGb4i01jvw0SRdL5Bt/300129fe3be7a6564cb775553f1f1a895db4261c?placeholderIfAbsent=true",
      progress: "33%",
    },
    {
      name: "Matt Cannon",
      email: "info@mattcannon.com",
      avatar:
        "https://cdn.builder.io/api/v1/image/assets/YJIGb4i01jvw0SRdL5Bt/b72ba321f38efca1e29f3a3f03f4c8077d2287e5?placeholderIfAbsent=true",
      progress: "75%",
    },
  ];

  return (
    <Box
      sx={{
        borderRadius: "0px",
        display: "flex",
        maxWidth: "318px",
        flexDirection: "column",
        alignItems: "stretch",
        fontWeight: 500,
        margin: "0 auto",
      }}
    >
      <Card
        sx={{
          borderRadius: "12px",
          boxShadow: "1px 1px 1px 0px rgba(16, 25, 52, 0.40)",
          display: "flex",
          width: "100%",
          height: "320px",
          padding: "31px 30px",
          flexDirection: "column",
          alignItems: "stretch",
          background: "var(--Secondary-Colors-Color-1, #0B1739)",
          color: "white",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "var(--Neutral-Colors-100, #FFF)",
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily:
              "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "16px",
            lineHeight: 1.13,
            alignSelf: "start",
            fontWeight: 500,
          }}
        >
          Team progress
        </Typography>

        {teamMembers.map((member, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              marginTop: index === 0 ? "30px" : "31px",
              width: "100%",
              alignItems: "stretch",
              gap: "20px",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "stretch",
                gap: "5px",
                fontSize: "10px",
                lineHeight: 1.4,
              }}
            >
              <Avatar
                src={member.avatar}
                sx={{
                  width: "29px",
                  height: "28px",
                  flexShrink: 0,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                <Typography
                  sx={{
                    color: "var(--Neutral-Colors-100, #FFF)",
                    fontFeatureSettings: "'liga' off, 'clig' off",
                    fontFamily:
                      "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "10px",
                    lineHeight: 1.4,
                    alignSelf: "start",
                  }}
                >
                  {member.name}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--Neutral-Colors-400, #AEB9E1)",
                    fontFeatureSettings: "'liga' off, 'clig' off",
                    fontFamily:
                      "Mona-Sans, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "10px",
                    lineHeight: 1.4,
                  }}
                >
                  {member.email}
                </Typography>
              </Box>
            </Box>
            <Typography
              sx={{
                color: "var(--Neutral-Colors-100, #FFF)",
                textAlign: "right",
                fontFeatureSettings: "'liga' off, 'clig' off",
                fontFamily:
                  "Mona-Sans, -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "12px",
                lineHeight: 1.17,
                alignSelf: "start",
                marginTop: "15px",
              }}
            >
              {member.progress}
            </Typography>
          </Box>
        ))}
      </Card>
    </Box>
  );
};

export default TeamProgressCard;
