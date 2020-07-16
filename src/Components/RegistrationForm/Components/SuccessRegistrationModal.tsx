import * as React from "react";
import { Modal, WithStyles, Box, Button, Grid } from "@material-ui/core";
import { styles } from "../RegistrationFormStyle";
import CloseIcon from "@material-ui/icons/Close";

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}

type TProps = IProps & WithStyles<typeof styles>;

export class SuccessRegistrationModal extends React.Component<TProps> {
  renderModalBody() {
    const { classes, onClose } = this.props;

    return (
      <div className={classes.successRegistrationModal}>
        <Box className={classes.SMSModalBody}>
          <CloseIcon className={classes.SMSModalCloseIcon} onClick={onClose} />
          <h2>Спасибо, что выбрали нас!</h2>
          <p className={classes.successRegistrationModalText}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Aspernatur, rem. Animi provident molestiae ut porro consequuntur sit
            nemo ad rem pariatur quasi minus, sapiente, magni, in exercitationem
            nam praesentium velit! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Aspernatur, rem. Animi provident molestiae ut
            porro consequuntur sit nemo ad rem pariatur quasi minus, sapiente,
            magni, in exercitationem nam praesentium velit! Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Aspernatur, rem. Animi
            provident molestiae ut porro consequuntur sit nemo ad rem pariatur
            quasi minus, sapiente, magni, in exercitationem nam praesentium
            velit!
          </p>
          <Grid
            direction="row"
            justify="flex-end"
            className={classes.successRegistrationModalCloseButton}
          >
            <Button variant="contained" color="secondary" onClick={onClose}>
              Закрыть
            </Button>
          </Grid>
        </Box>
      </div>
    );
  }

  render() {
    const { isOpen, onClose } = this.props;

    return (
      <Modal open={isOpen} onClose={onClose}>
        {this.renderModalBody()}
      </Modal>
    );
  }
}
