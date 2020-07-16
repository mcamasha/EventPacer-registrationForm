import { createStyles, Theme } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    header: {
      ...theme.typography.button,
      fontSize: theme.spacing(3),
      float: "left",
      margin: theme.spacing(5, 0),
    },
    container: {
      display: "flex",
      flexDirection: "column",
    },
    registrationForm: {
      marginBottom: theme.spacing(4),
    },
    welcomeHeader: {
      float: "left",
      margin: theme.spacing(4, 0),
    },
    welcomeText: {
      textAlign: "left",
      width: "80%",
    },
    welcomeBody: {
      display: "flex",
    },
    welcomeMainText: {
      textAlign: "left",
      marginTop: theme.spacing(4),
    },
    sectionFooter: {
      textAlign: "right",
      marginTop: theme.spacing(4),
    },
    generalInfoFieldsContainer: {
      display: "flex",
      justifyContent: "space-around",
    },
    generalInfoLogoInput: {
      display: "none",
    },
    generalInfoLogoInputContainer: {
      float: "right",
    },
    generalInfoPreviewLogoContainer: {
      margin: "0",
      justifyContent: "center",
      position: "relative",
      width: "200%",
    },
    generalInfoPreviewItemContainer: {
      padding: "0!important",
      position: "absolute",
      top: theme.spacing(-14),
      left: theme.spacing(9),
    },
    generalInfoDropZoneLogoIcon: {
      color: "#757575",
    },
    generalInfoDropzoneText: {
      fontSize: "1.2em",
      color: "#757575",
    },
    generalInfoDropZoneLogo: {
      borderWidth: "1px",
      borderColor: "#757575",
    },
    generalInfoNextButton: {
      width: theme.spacing(25),
      height: theme.spacing(5),
    },
    formRow: {
      marginBottom: theme.spacing(3),
      width: theme.spacing(38),
    },
    formColomn: {
      width: theme.spacing(38),
      marginRight: theme.spacing(8),
      display: "inline-block",
    },
    contactsPhone: {
      display: "flex",
      flexDirection: "row",
    },
    contactsPhoneContainer: {
      width: "100%",
    },
    contactsPrefixSelect: {
      marginRight: theme.spacing(3),
    },
    SMSModal: {
      position: "absolute",
      width: theme.spacing(50),
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      backgroundColor: theme.palette.background.paper,
      top: "40%",
      left: "35%",
    },
    SMSModalBody: {
      position: "relative",
    },
    SMSModalCloseIcon: {
      position: "absolute",
      right: "0",
      cursor: "pointer",
    },
    SMSModalSendCodeButton: {
      width: theme.spacing(15),
      height: theme.spacing(5),
    },
    successRegistrationModal: {
      position: "absolute",
      width: theme.spacing(75),
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      backgroundColor: theme.palette.background.paper,
      top: "30%",
      left: "30%",
    },
    successRegistrationModalText: {
      margin: theme.spacing(7, 0),
    },
    successRegistrationModalCloseButton: {
      textAlign: "end",
    },
  });
