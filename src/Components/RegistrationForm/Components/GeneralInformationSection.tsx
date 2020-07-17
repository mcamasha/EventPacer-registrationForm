import * as React from "react";
import {
  Container,
  WithStyles,
  Box,
  Button,
  TextField,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { styles } from "../RegistrationFormStyle";
import { DropzoneArea } from "material-ui-dropzone";
import { ISectionProps } from "../Models";

type TProps = ISectionProps & WithStyles<typeof styles>;

/**
 * Секция "Общая информация".
 */
export class GeneralInformationSection extends React.Component<TProps> {
  /**
   * Метод возвращающий кастомную текстовку нотификации успешного добавления логотипа.
   *
   * @param {string} fileName Наименование добавляемого поля.
   */
  getLogoAddedMessage = (fileName: string) => {
    return `Файл ${fileName} был успешно добавлен.`;
  };

  /**
   * Метод возвращающий кастомную текстовку нотификации успешного добавления логотипа.
   *
   * @param {string} fileName Наименование добавляемого поля.
   */
  handleChangeFile = (newLogo: any) => {
    this.props.onChange({ logo: newLogo });
  };

  /**
   * Обработчик изменения значения поля "Наименование".
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event Событие изменения значения.
   */
  handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ name: event.target.value });
  };

  /**
   * Обработчик изменения значения поля "Описание".
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event Событие изменения значения.
   */
  handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange({ description: event.target.value });
  };

  /**
   * Обработчик изменения значения поля "Web-сайт".
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event Событие изменения значения.
   */
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
                showPreviews
                showPreviewsInDropzone={false}
                previewGridClasses={{
                  container: classes.generalInfoPreviewLogoContainer,
                  item: classes.generalInfoPreviewItemContainer,
                }}
                previewText=""
                dropzoneParagraphClass={classes.generalInfoDropzoneText}
                classes={{
                  root: classes.generalInfoDropZoneLogo,
                  icon: classes.generalInfoDropZoneLogoIcon,
                }}
              />
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
