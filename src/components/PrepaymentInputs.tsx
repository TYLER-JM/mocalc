import {ONCE, PrepaymentFrequencyOptions, REGULAR, YEARLY} from "../definitions/StringTypes.ts";
import Input from "./Input.tsx";

interface PrepaymentInputProps {
	setPrepaymentAmount: (amount: number) => void;
	setPrepaymentFrequency: (frequency: PrepaymentFrequencyOptions) => void;
}

export default function PrepaymentInputs({
	setPrepaymentAmount,
	setPrepaymentFrequency,
}: PrepaymentInputProps) {
	return (
		<>
			<Input
				label="Prepayment Amount"
				inputName="prepaymentAmount"
				placeholder=""
				setState={setPrepaymentAmount}
			/>
			<label>
				<span>Prepayment Frequency</span>
				<select
					name="prepaymentFrequency"
					className="form-input"
					onChange={(e) => setPrepaymentFrequency(e.target.value as PrepaymentFrequencyOptions)}
				>
					<option value={YEARLY}>Once a year</option>
					<option value={ONCE}>One time</option>
					<option value={REGULAR}>Same as regular payment</option>
				</select>
			</label>
		</>
	)
}