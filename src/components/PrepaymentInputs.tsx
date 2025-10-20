import {PrepaymentFrequencyOptions, REGULAR, YEARLY} from "../definitions/StringTypes.ts";
import Input from "./Input.tsx";
import { useState } from "react";
import {currencyFormatter} from "../utils/helpers.ts";
import {CalculatorInputs} from "../definitions/CalculatorDefinitions.ts";
import {Box, Button, Flex, Select, Text} from "@radix-ui/themes";

interface PrepaymentInputProps {
	setPrepaymentAmount: (amount: number) => void;
	setPrepaymentFrequency: (frequency: PrepaymentFrequencyOptions) => void;
	prepaymentFrequencyState: PrepaymentFrequencyOptions;
	resetKey: number;
	calculator: CalculatorInputs;
}

export default function PrepaymentInputs({
	setPrepaymentAmount,
	setPrepaymentFrequency,
	prepaymentFrequencyState,
	resetKey,
	calculator
}: PrepaymentInputProps) {
	const [collapsed, setCollapsed] = useState<boolean>(true)
	return (
		<>

			<Button variant="soft" size="2" onClick={() => setCollapsed(prev => !prev)}>
				View prepayment options
			</Button>

			{/*<div className="prepayment-options--header" onClick={() => setCollapsed(prev => !prev)}>*/}
			{/*	View Prepayment options*/}
			{/*</div>*/}

			{/*<div className={`calculator-inputs--group prepayment-options--inputs ${collapsed ? 'collapsed' : ''}`}>*/}

				<Box className={`prepayment-options--inputs ${collapsed ? 'collapsed' : ''}`}>

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

					<Flex gap="1" direction="column">
						<Text>Prepayment Frequency</Text>
						<Select.Root
							value={prepaymentFrequencyState as string}
							defaultValue={prepaymentFrequencyState as string}
							onValueChange={val => setPrepaymentFrequency(val as PrepaymentFrequencyOptions)}
						>
							<Select.Trigger placeholder="None" />
							<Select.Content>
								<Select.Item value={YEARLY}>Once a year</Select.Item>
								{/*<Select.Item value={ONCE}>One Time</Select.Item>*/}
								<Select.Item value={REGULAR}>Same as regular payment</Select.Item>
							</Select.Content>
						</Select.Root>
					</Flex>

				</Box>

			{/*</div>*/}

		</>
	)
}