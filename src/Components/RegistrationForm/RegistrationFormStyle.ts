import { createStyles, Theme } from "@material-ui/core";

export const styles = (theme: Theme) =>
  createStyles({
    header: {
      ...theme.typography.button,
      fontSize: theme.spacing(3),
      float: "left",
      margin: theme.spacing(5, 0)
    },
    container: {
      display: "flex",
      flexDirection: "column"
    },
    registrationForm: {
      marginBottom: theme.spacing(4)
    },
    welcomeHeader: {
      float: "left",
      margin: theme.spacing(4, 0)
    },
    welcomeText: {
      textAlign: "left",
      width: "80%"
    },
    welcomeBody: {
      display: "flex"
    },
    welcomeMainText: {
      textAlign: "left",
      marginTop: theme.spacing(4)
    },
    sectionFooter: {
      textAlign: "right",
      marginTop: theme.spacing(4)
    },
    generalInfoFieldsContainer: {
      display: "flex",
      justifyContent: "space-around"
    },
    generalInfoLogoInput: {
      display: "none"
    },
    generalInfoLogoInputContainer: {
      float: "right"
    },
    formRow: {
      marginBottom: theme.spacing(3),
      width: theme.spacing(38)
    },
    formColomn: {
      width: theme.spacing(38),
      marginRight: theme.spacing(8),
      display: "inline-block"
    },
    contactsPhone: {
      display: "flex",
      flexDirection: "row"
    },
    contactsPhoneContainer: {
      width: "100%"
    },
    contactsPrefixSelect: {
      marginRight: theme.spacing(3)
    }
  });
