import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import { ListItemText, Typography, IconButton, Card } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import {
  deleteTweet,
  editTweet,
  likeTweet,
  tweetReply,
} from "../features/tweet/tweetSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, TextField } from "@mui/material";

import { useSnackbar } from "notistack";


var colors = [
  "aqua",
  "blanchedalmond",
  "blue",
  "fuchsia",
  "gold",
  "green",
  "lime",
  "coral",
  "navy",
  "olive",
  "orange",
  "mediumpurple",
  "orangered",
  "silver",
  "teal",
  "deepskyblue",
  "yellow",
  "lightsalmon",
  "palegreen",
  "pink",
  "plum",
  "tomato",
  "violet",
  "olivedrab",
  "moccasin",
  "lawngreen",
];
const theme = createTheme();

export default function TweetCard({
  id,
  displayName,
  username,
  text,
  liked,
  likeCount,
  replies,
  myTweet,
  tag,
  createdTime,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [reply, setReply] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [editedTweetText, setEditedTweetText] = React.useState(text);

  const { token } = useSelector((state) => state.user);
  const { tweets } = useSelector((state) => state.tweet);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeTweet = () => {
    dispatch(
      likeTweet({
        tweetId: id,
        token,
      })
    );
  };

  const handleTweetReply = () => {
    if (reply.length !== 0) {
      dispatch(
        tweetReply({
          tweetId: id,
          body: {
            replyMsg: reply,
          },
          token,
        })
      );
      setReply("");
    } else {
      const variant = "error";
      enqueueSnackbar("Please enter tweet reply!", { variant });
    }
  };


  const handleEditTweet = () => {
    let t = tweets.find((item) => item.tweetId === id);
    console.log(t);
    if (t) {
      let x = JSON.parse(JSON.stringify(t));
      x.message = editedTweetText;
      console.log(t);
      dispatch(
        editTweet({
          body: x,
          token,
        })
      );
    }
    setOpen(false);
  };

  const handleDeleteTweet = () => {
    dispatch(
      deleteTweet({
        tweetId: id,
        token,
      })
    );
    const variant = "error";
    enqueueSnackbar("Tweet Deleted", { variant });
  };

  const body = (
    <div className="modal modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Tweet</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            onClick={handleClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={editedTweetText}
                onChange={(e) => setEditedTweetText(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleEditTweet}
          >
            Edit Message
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
    <Card>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            style={{
              backgroundColor:
                colors[
                  displayName.charAt(0).toUpperCase().charCodeAt(0) -
                    "A".charCodeAt(0)
                ],
            }}
          >
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={displayName}
        subheader={username}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-tweet"
        aria-describedby="edit-tweet-description"
      >
        {body}
      </Modal>

      <CardContent style={{ wordBreak: "break-word", padding: "10px 15px" }}>
        <Typography variant="body1" color="textSecondary" component="p">
          {text}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {tag}
        </Typography>
        <Typography component="div">
          <p className="card-text text-end">
            <small className="text-muted text-black-50">
              {new Date(createdTime+"Z").toLocaleString(undefined, {
                timeZone: "Asia/Kolkata",
              })}
            </small>
          </p>
        </Typography>
      </CardContent>
      <CardActions  className="pr-0 py-0">
        <IconButton aria-label="Like Tweet" onClick={handleLikeTweet}>
          {liked ? <FavoriteIcon sx={{color:"tomato"}} /> : <FavoriteIcon />}
          <div style={{ fontSize: ".5em", color: "#6c757d" }}>
            <span>{likeCount}</span>
          </div>
        </IconButton>
        <IconButton
          style={{marginLeft:"auto"}}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        {myTweet ? (
          <div className="d-flex">
            <IconButton aria-label="Edit Tweet" onClick={handleOpen}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Delete Tweet" onClick={handleDeleteTweet}>
              <DeleteIcon />
            </IconButton>
          </div>
        ) : null}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div sx={{marginBottom: "25px"}}>
            <TextField
              label="Reply"
              variant="outlined"
              style={{ width: "100%" }}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTweetReply}
                    style={{ height: "100%" }}
                  >
                    Reply
                  </Button>
                ),
              }}
            />
          </div>
          {replies?.map((r) => (
            <div key={r.tweetreplyId}>
              <div
                className={`px-2`}
                style={{ wordBreak: "break-word",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              >
                <ListItemText
                  component="p"
                  secondary={r.userId}
                  primary={r.replyMsg}
                />
                <div
                  style={{
                    fontSize: ".75em",
                    color: "#6c757d",
                    textAlign: "right",
                  }}
                >
                  <span>
                    {new Date(r.creationTime+"Z").toLocaleString(undefined, {
                      timeZone: "Asia/Kolkata",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Collapse>
      <Divider light />
    </Card>
    </ThemeProvider>
  );
}
