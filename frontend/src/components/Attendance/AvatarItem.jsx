import { Avatar, Badge, ListItemAvatar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { FaCrown } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

const AvatarItem = ({ member }) => {
  return (
    <ListItemAvatar sx={{ marginRight: "5px" }}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        badgeContent={
          (member.isMamash && <StarIcon color="warning" />) ||
          (member.isAdmin && (
            <IconContext.Provider value={{ color: "gold", size: 20 }}>
              <div>
                <FaCrown />
              </div>
            </IconContext.Provider>
          ))
        }
      >
        <Avatar alt={member.name} src={member.avatar} />
      </Badge>
    </ListItemAvatar>
  );
};

export default AvatarItem;
