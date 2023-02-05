import LoadingButton from "@/component/general/loadingButton";
import { useApplicationMutate } from "@/hooks/user";
import { IApplicationForm } from "@/interface/application";
import { IModelProps } from "@/interface/general/model";
import { Box, Button, Dialog, Grid, IconButton, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, ReactNode, useState } from "react";
import { FaTimes } from "react-icons/fa";

const defaultForm: IApplicationForm = {
  passport: "",
  dateOfBirth: new Date(),
  address: { street: "", state: "", city: "", postalCode: "", country: "" },
};

const data: IApplicationForm = { ...defaultForm };

function FormItem({ name, value, parent }: { name: string; value: string | Date; parent?: string }) {
  return name == "country" ? (
    <></>
  ) : (
    <TextField
      onChange={(e) => {
        if (parent) {
          data[parent] = { ...data[parent] };
          data[parent][name] = e.target.value;
        } else data[name] = e.target.value;
        // setData({ ...data });
      }}
      fullWidth
      type={typeof value == "string" ? "text" : "date"}
      name={name}
      // value={parent ? data[parent][name] : data[name]}
      label={name.charAt(0).toUpperCase() + name.slice(1)}
    />
  );
}

function FormParent({ name, value }: { name: string; value: { [index: string]: string } }) {
  return (
    <Grid container direction={"row"} rowSpacing="1em" columnSpacing="1em">
      {Object.keys(value).map((key) => (
        <Grid item xs={12} sm={6} md={4}>
          <FormItem name={key} value={value[key]} parent={name} />
        </Grid>
      ))}
    </Grid>
  );
}

export default function ApplicationFormDialog(props: IModelProps) {
  const { applicationMutate, loading, error } = useApplicationMutate(props.close);
  const [val, setVal] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    applicationMutate(data);
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "600px",
          border: "none",
          backgroundColor: "white",
        },
      }}
    >
      <Box p={"1em"}>
        <Stack direction={"row"} gap={"1em"} alignItems="center" justifyContent="space-between">
          <Typography my={"1em"} textAlign="center">
            Create Application
          </Typography>

          <IconButton
            aria-label="close"
            onClick={props.close}
            sx={{
              fontSize: { xs: "12px", sm: "18px", md: "24px" },
              color: "#000000",
            }}
          >
            <FaTimes />
          </IconButton>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Typography> Valid country: NG, US, </Typography>
          <Typography> {error?.message} </Typography>
          <Stack gap="1em">
            {Object.keys(defaultForm).map((key) => {
              if (typeof defaultForm[key] == "string" || defaultForm[key].toDateString) {
                return <FormItem key={key} name={key} value={defaultForm[key]} />;
              } else {
                return <FormParent key={key} name={key} value={defaultForm[key]} />;
              }
            })}
            <TextField
              onChange={(e) => {
                setVal(e.target.value);
                data["address"]["country"] = e.target.value;
              }}
              fullWidth
              select
              label={"Country"}
            >
              {[{ val: "NG", label: "Nigeria" }].map((item) => (
                <MenuItem key={item.val} value={item.val}>
                  {" "}
                  {item.label}{" "}
                </MenuItem>
              ))}
            </TextField>

            <LoadingButton loading={loading} variant="contained" type="submit">
              Submit
            </LoadingButton>
          </Stack>
        </form>
      </Box>
    </Dialog>
  );
}
