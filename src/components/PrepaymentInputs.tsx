import {ONCE, PrepaymentFrequencyOptions, REGULAR, YEARLY} from "../definitions/StringTypes.ts";
import Input from "./Input.tsx";
import {useState} from "react";

interface PrepaymentInputProps {
	setPrepaymentAmount: (amount: number) => void;
	setPrepaymentFrequency: (frequency: PrepaymentFrequencyOptions) => void;
}

export default function PrepaymentInputs({
	setPrepaymentAmount,
	setPrepaymentFrequency,
}: PrepaymentInputProps) {
	const [collapsed, setCollapsed] = useState<boolean>(true)
	return (
		<>
			<div className="prepayment-options--header" onClick={() => setCollapsed(prev => !prev)}>
				View Prepayment options
			</div>
			<div className={`calculator-inputs--group prepayment-options--inputs ${collapsed ? 'collapsed' : ''}`}>
				<Input
					label="Prepayment Amount"
					inputName="prepaymentAmount"
					placeholder=""
					setState={setPrepaymentAmount}
				/>
				<label htmlFor="prepaymentFrequency" className="form-label">
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
			</div>

		</>
	)
}