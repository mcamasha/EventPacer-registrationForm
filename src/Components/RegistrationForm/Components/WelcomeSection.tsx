import * as React from "react";
import {
  Typography,
  Container,
  WithStyles,
  Box,
  Button,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { styles } from "../RegistrationFormStyle";

/**
 * @prop {Function} onNextButtonClick Обработчик нажатия на кнопку "Далее".
 */
interface IProps {
  onNextButtonClick: () => void;
}

type TProps = IProps & WithStyles<typeof styles>;

/**
 * Секция "Приветствие".
 */
export const WelcomeSection: React.SFC<TProps> = ({
  classes,
  onNextButtonClick,
}) => {
  return (
    <Container maxWidth="md" className={classes.container}>
      <Box>
        <Typography className={classes.welcomeHeader} variant="h5">
          Добро Пожаловать!
        </Typography>
      </Box>
      <Box className={classes.welcomeBody}>
        <Box>
          <Typography variant="body1" className={classes.welcomeText}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur.
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" className={classes.welcomeText}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur.
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="body1" className={classes.welcomeMainText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quod
          sapiente quo aspernatur reprehenderit praesentium. Voluptatum
          excepturi dolorum, recusandae voluptas perspiciatis tenetur aperiam
          accusantium tempore, repellendus et aut expedita quaerat. Voluptatum
          excepturi dolorum, recusandae voluptas perspiciatis tenetur aperiam
          accusantium tempore, repellendus et aut expedita quaerat. Voluptatum
          excepturi dolorum, recusandae voluptas perspiciatis tenetur aperiam
          accusantium tempore, repellendus et aut expedita quaerat. Voluptatum
          excepturi dolorum, recusandae voluptas perspiciatis tenetur aperiam
          accusantium tempore, repellendus et aut expedita quaerat.
        </Typography>
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
};
