import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./hooks/useSettings";
import useUpdateSetting from "./hooks/useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      CreatersName,
      maxSharedProfit,
      maxShares,
      TopRegion,
      BrokerFee,
    } = {},
  } = useSettings();

  const { isUpdating, Updatesetting } = useUpdateSetting();

  if (isLoading) {
    return <Spinner />;
  }
  function handleUpdate(e, field) {
    const { value } = e.target;
    Updatesetting({ [field]: value });
  }
  return (
    <Form>
      <FormRow label="Creater's Name">
        <Input
          disabled={isUpdating}
          id="CreatersName"
          defaultValue={CreatersName}
          onBlur={(e) => handleUpdate(e, "CreatersName")}
        />
      </FormRow>
      <FormRow label="Maximum Number of Shared Profit">
        <Input
          disabled={isUpdating}
          type="number"
          id="maxSharedProfit"
          defaultValue={maxSharedProfit}
          onBlur={(e) => handleUpdate(e, "maxSharedProfit")}
        />
      </FormRow>
      <FormRow label="Maximum Number of Stocks">
        <Input
          disabled={isUpdating}
          type="number"
          id="maxShares"
          defaultValue={maxShares}
          onBlur={(e) => handleUpdate(e, "maxShares")}
        />
      </FormRow>
      <FormRow label="Top Most Region">
        <Input
          disabled={isUpdating}
          id="TopRegion"
          defaultValue={TopRegion}
          onBlur={(e) => handleUpdate(e, "TopRegion")}
        />
      </FormRow>
      <FormRow label="Broker Share (percentage %)">
        <Input
          disabled={isUpdating}
          id="isBroker"
          defaultValue={BrokerFee}
          onBlur={(e) => handleUpdate(e, "BrokerFee")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
