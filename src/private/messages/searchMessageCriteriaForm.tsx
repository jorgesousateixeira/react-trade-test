import {FC, useState} from "react";
import {SubmitHandler, useForm, Controller } from "react-hook-form";
import {Button, MenuItem, Select, TextField} from "@mui/material";
import {DateTimePicker} from "@mui/lab";
import SearchBar from "../common/searchBar/searchBar";
import {t} from "i18next";
import styles from './searchMessageCriteriaForm.module.css';

type FormValues = {
    StartDate: Date;
    EndDate: Date;
    Origin: string;
    Destination: string;
    Type: string;
};
const defaultValues = {
    StartDate: new Date(),
    EndDate: new Date(),
    Origin: "",
    Destination: "",
    Type: ""
};

const MessageTypes = ["HTTP","FILE","SFTP"];
interface SearchMessageCriteriaFormProps {
    handleSearch: any;
}

const SearchMessageCriteriaForm: FC<SearchMessageCriteriaFormProps> = ({handleSearch}) => {
    const {
        handleSubmit,
        register,
        reset,
        control,
        formState: { errors }} = useForm<FormValues>({ defaultValues });
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log('Submit form with data: ' + JSON.stringify(data));
        handleSearch();
    };
    const [value, setValue] = useState<Date | null>(new Date());
    return (
        <>
            <SearchBar handleSearch={handleSearch} label={t('messages.searchForMessages')} />
            <form className={styles.formMessageCriteria} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.divMessageCriteria}>
                    {/*Start Date*/}
                    <div className={styles.startDate}>
                        <Controller
                            control={control}
                            name="StartDate"
                            render={({
                                         field: {onChange, onBlur, value, name, ref},
                                         fieldState: {invalid, isTouched, isDirty, error},
                                         formState,
                                     }) =>
                                (
                                    <DateTimePicker
                                        renderInput={(props) => <TextField fullWidth variant="standard" {...props} />}
                                        label="DateTimePicker"
                                        value={value}
                                        onChange={onChange}
                                    />
                                )
                            }
                        />
                    </div>
                    {/*End Date*/}
                    <div className={styles.endDate}>
                        <Controller
                            control={control}
                            name="EndDate"
                            render={({
                                         field: {onChange, onBlur, value, name, ref},
                                         fieldState: {invalid, isTouched, isDirty, error},
                                         formState,
                                     }) =>
                                (
                                    <DateTimePicker
                                        renderInput={(props) => <TextField fullWidth variant="standard" {...props} />}
                                        label="DateTimePicker"
                                        value={value}
                                        onChange={onChange}
                                    />
                                )
                            }
                        />
                    </div>
                    {/*Origin*/}
                    <div className={styles.origin}>
                        <label>Origin: </label>
                        <Controller
                            render={({field}) => <TextField fullWidth variant="standard" {...field} />}
                            name="Origin"
                            control={control}
                        />
                    </div>
                    {/*Destination*/}
                    <div className={styles.destination}>
                        <label>Destination: </label>
                        <Controller
                            render={({field}) => <TextField fullWidth variant="standard" {...field} />}
                            name="Destination"
                            control={control}
                        />
                    </div>
                    {/* Type */}
                    <div className={styles.type}>
                        <label>Type</label>
                        <Controller
                            control={control}
                            name="Type"
                            render={({
                                         field: {onChange, onBlur, value, name, ref},
                                         fieldState: {invalid, isTouched, isDirty, error},
                                         formState,
                                     }) =>
                                (
                                    <Select fullWidth
                                            variant="standard"
                                            onChange={onChange}>
                                        {MessageTypes.map((messageType) => (
                                            <MenuItem key={messageType} value={messageType}>
                                                {messageType}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )
                            }
                        />
                    </div>
                </div>
                <Button variant="contained" type={"submit"}>
                    Submit
                </Button>
            </form>
        </>
    )
}

export default SearchMessageCriteriaForm;
