import * as React from "react";
import {
  Typography,
  Container,
  WithStyles,
  Box,
  Button,
  TextField,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { styles } from "../RegistrationFormStyle";
import {
  IRegistrationRequest,
  TRegistrationRequestRequiredFields,
} from "../../../Models";
import { DropzoneArea } from "material-ui-dropzone";

interface IProps {
  // пропсы вынести в общие
  onNextButtonClick: () => void;
  onChange: (partial: Partial<IRegistrationRequest>) => void;
  form: IRegistrationRequest;
  isErrorVisible: (
    fieldName: keyof TRegistrationRequestRequiredFields
  ) => boolean;
}

type TProps = IProps & WithStyles<typeof styles>;

export class GeneralInformationSection extends React.Component<TProps> {
  getLogoAddedMessage = (fileName: string) => {
    return `Файл ${fileName} был успешно добавлен.`;
  };

  handleChangeFile = (newLogo: any) => {
    this.props.onChange({ logo: newLogo });
  };

  handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ name: event.target.value });
  };

  handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ description: event.target.value });
  };

  handleChangeSite = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ site: event.target.value });
  };

  render() {
    const {
      classes,
      onNextButtonClick,
      form: { name, description, site },
      isErrorVisible,
    } = this.props;
    const isNameErrorVisible = isErrorVisible("name") && !name;

    return (
      <Container maxWidth="md" className={classes.container}>
        <Box className={classes.generalInfoFieldsContainer}>
          <Box className={classes.formColomn}>
            <Box className={classes.formRow}>
              <DropzoneArea
                dropzoneText="Перетащите файл"
                filesLimit={1}
                maxFileSize={5000000}
                acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
                onChange={this.handleChangeFile}
                getFileAddedMessage={this.getLogoAddedMessage}
              />
            </Box>
            <Box className={classes.generalInfoLogoInputContainer}>
              <input
                accept="image/*"
                className={classes.generalInfoLogoInput}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Выбрать файл
                </Button>
              </label>
            </Box>
          </Box>
          <Box className={classes.formColomn}>
            <Box className={classes.formRow}>
              <TextField
                label="Наименование"
                value={name}
                fullWidth
                error={isNameErrorVisible}
                helperText={
                  isNameErrorVisible && "Не указано наименование организации"
                }
                onChange={this.handleChangeName}
              />
            </Box>
            <Box className={classes.formRow}>
              <TextField
                label="Описание"
                multiline
                rows={11}
                variant="outlined"
                fullWidth
                value={description}
                onChange={this.handleChangeDescription}
              />
            </Box>
            <Box className={classes.formRow}>
              <TextField
                label="Web-сайт компании"
                value={site}
                fullWidth
                onChange={this.handleChangeSite}
              />
            </Box>
          </Box>
        </Box>
        <Box className={classes.sectionFooter}>
          <Button
            onClick={onNextButtonClick}
            variant="contained"
            color="secondary"
            endIcon={<ArrowForwardIosIcon />}
          >
            Далее
          </Button>
        </Box>
      </Container>
    );
  }
}
