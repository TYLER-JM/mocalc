import {PrepaymentFrequencyOptions, REGULAR, YEARLY} from "../definitions/StringTypes.ts";
import Input from "./Input.tsx";
import {Ref, useState} from "react";
import {currencyFormatter} from "../utils/helpers.ts";
import {CalculatorInputs} from "../definitions/CalculatorDefinitions.ts";

interface PrepaymentInputProps {
	setPrepaymentAmount: (amount: number) => void;
	setPrepaymentFrequency: (frequency: PrepaymentFrequencyOptions) => void;
	prepaymentFrequencyRef: Ref<HTMLSelectElement>;
	resetKey: number;
	calculator: CalculatorInputs;
}

export default function PrepaymentInputs({
	setPrepaymentAmount,
	setPrepaymentFrequency,
	prepaymentFrequencyRef,
	resetKey,
	calculator
}: PrepaymentInputProps) {
	const [collapsed, setCollapsed] = useState<boolean>(true)
	return (
		<>
			<div className="prepayment-options--header" onClick={() => setCollapsed(prev => !prev)}>
				View Prepayment options
			</div>
			<div className={`calculator-inputs--group prepayment-options--inputs ${collapsed ? 'collapsed' : ''}`}>
				<Input
					key={`prepayment-amount-${resetKey}`}
					label="Prepayment Amount"
					inputName="prepaymentAmount"
					formatter={currencyFormatter}
					icon={{name: 'icon-dollar-sign', placement: 'start'}}
					placeholder="0"
					setState={setPrepaymentAmount}
					{ ...(calculator.prepaymentOptions.isValid() ? {defaultValue: calculator.prepaymentOptions.amount?.toString()} : {}) }
				/>
				<label htmlFor="prepaymentFrequency" className="form-label">
					<span>Prepayment Frequency</span>
					<select
						ref={prepaymentFrequencyRef}
						defaultValue={calculator.prepaymentOptions?.frequency}
						name="prepaymentFrequency"
						className="form-input"
						onChange={(e) => setPrepaymentFrequency(e.target.value as PrepaymentFrequencyOptions)}
					>
						<option value="">None</option>
						<option value={YEARLY}>Once a year</option>
						{/*<option value={ONCE}>One time</option>*/}
						<option value={REGULAR}>Same as regular payment</option>
					</select>
				</label>
			</div>

		</>
	)
}