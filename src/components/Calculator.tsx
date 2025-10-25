import Input from "./Input.tsx";
import Output from "./Output.tsx";
import {
  ACCELERATED_BIWEEKLY,
  ACCELERATED_WEEKLY,
  BIWEEKLY,
  MONTHLY,
  SEMIMONTHLY,
  WEEKLY,
  PaymentSchedules, PrepaymentFrequencyOptions
} from "../definitions/StringTypes.ts";
import {CalculatorInputs, PrepaymentOptions} from "../definitions/CalculatorDefinitions.ts";
import { currencyFormatter } from "../utils/helpers.ts";
import { useState } from "react";
import PrepaymentInputs from "./PrepaymentInputs.tsx";
import {Button, Container, Flex, Select, Text} from "@radix-ui/themes";

interface CalculatorProps {
  setCalculators: (value: CalculatorInputs[] | ((prevValue: CalculatorInputs[]) => CalculatorInputs[])) => void
  calculator: CalculatorInputs
}

export default function Calculator({
  setCalculators,
  calculator
}: CalculatorProps) {
  const [resetKey, setResetKey] = useState<number>(0)
  const [termLength, setTermLength] = useState<string>(calculator.term.toString())
  const [paymentSchedule, setPaymentSchedule] = useState<string>(calculator.paymentType as string)
  const [prepaymentFrequencyState, setPrepaymentFrequencyState] = useState<string | undefined>(calculator.prepaymentOptions.frequency as string)

  function updateCalculators(inputs: CalculatorInputs) {
    setCalculators((prev: CalculatorInputs[]): CalculatorInputs[] => {
      return prev.map(calc => {
        return calc.id === inputs.id ? inputs : calc
      })
    })
  }
  function setPrincipal(val: number): void {
    const updatedInputs = calculator
    updatedInputs.principal = val
    updateCalculators(updatedInputs)
  }
  function setRate(val: number): void {
    const updatedInputs = calculator
    updatedInputs.rate = val
    updateCalculators(updatedInputs)
  }
  function setAmortization(val: number): void {
    const updatedInputs = calculator
    updatedInputs.amortization = val
    updateCalculators(updatedInputs)
  }
  function setTerm(val: number): void {
    const updatedInputs = calculator
    updatedInputs.term = val
    updateCalculators(updatedInputs)
    setTermLength(val.toString())
  }
  function setPaymentType(val: PaymentSchedules): void {
    const updatedInputs = calculator
    updatedInputs.paymentType = val
    updateCalculators(updatedInputs)
    setPaymentSchedule(val)
  }

  function setPrepaymentAmount(val: number): void {
    const updatedInputs = calculator
    updatedInputs.prepaymentOptions.amount = val
    updateCalculators(updatedInputs)
  }
  function setPrepaymentFrequency(val: PrepaymentFrequencyOptions): void {
    const updatedInputs = calculator
    updatedInputs.prepaymentOptions.frequency = val
    updateCalculators(updatedInputs)
    setPrepaymentFrequencyState(val)
  }

  function resetCalculator() {
    const updatedInputs: CalculatorInputs = {
      id: calculator.id,
      rate: 0,
      term: 5,
      paymentType: MONTHLY,
      principal: 0,
      amortization: 0,
      prepaymentOptions: new PrepaymentOptions()
    }

    updateCalculators(updatedInputs)
    setResetKey(prev => prev + 1)
    setTermLength("5")
    setPaymentSchedule(MONTHLY)
    setPrepaymentFrequencyState("")

  }

  return (
    <Container align="center">
    {/*<div className="calculator">*/}

      <div className="calculator-inputs">

        {/*<div className="calculator-inputs--group">*/}

          <Flex pb="4" gap="2">
            <Button
              size="2"
              variant="soft"
              onClick={() => setCalculators(
                (prev) => prev.filter(
                  calc => calc.id !== calculator.id
                )
              )}
            >
              Remove
            </Button>
            <Button size="2" variant="soft" onClick={resetCalculator}>Reset</Button>
          </Flex>

          <Input
            key={`amount-${resetKey}`}
            label="Mortgage Amount"
            placeholder="Amount to be borrowed"
            inputName="mortgageAmount"
            formatter={currencyFormatter}
            setState={setPrincipal}
            icon={{name: 'icon-dollar-sign', placement: 'start'}}
            { ...(calculator.principal === 0 ? {} : {defaultValue: calculator.principal.toString()}) }
          />
          <Input
            key={`interest-${resetKey}`}
            label="Interest Rate"
            placeholder="3.4"
            inputName="interestRate"
            setState={setRate}
            icon={{name: 'icon-percent', placement: 'end'}}
            { ...(calculator.rate === 0 ? {} : {defaultValue: calculator.rate.toString()}) }
          />
          <Input
            key={`amortization-${resetKey}`}
            label="Amortization period"
            placeholder="25"
            inputName="amortizationPeriod"
            formatter={currencyFormatter}
            setState={setAmortization}
            { ...(calculator.amortization === 0 ? {} : {defaultValue: calculator.amortization.toString()}) }
          />

          <Flex width="100%" gap="1" direction="column">
            <Text as="label">Term Length (in years)</Text>
            <Select.Root
              defaultValue={termLength}
              value={termLength}
              onValueChange={(val) => setTerm(parseInt(val))}
            >
              <Select.Trigger placeholder="Term Length" />
              <Select.Content>
                <Select.Item value="1">1</Select.Item>
                <Select.Item value="2">2</Select.Item>
                <Select.Item value="3">3</Select.Item>
                <Select.Item value="4">4</Select.Item>
                <Select.Item value="5">5</Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>

          <Flex gap="1" direction="column">
            <Text as="label">Payment Schedule</Text>
            <Select.Root
              defaultValue={paymentSchedule}
              value={paymentSchedule}
              onValueChange={(val) => setPaymentType(val as PaymentSchedules)}
            >
              <Select.Trigger placeholder="Payment Schedule" />
              <Select.Content>
                <Select.Item value={WEEKLY}>Weekly</Select.Item>
                <Select.Item value={BIWEEKLY}>Bi-weekly (every 2-weeks)</Select.Item>
                <Select.Item value={SEMIMONTHLY}>Semi-monthly (Twice a month)</Select.Item>
                <Select.Item value={MONTHLY}>Monthly</Select.Item>
                <Select.Item value={ACCELERATED_WEEKLY}>Accelerated weekly</Select.Item>
                <Select.Item value={ACCELERATED_BIWEEKLY}>Accelerated Bi-weekly</Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>

        {/*</div> */}

        <PrepaymentInputs
          setPrepaymentAmount={setPrepaymentAmount}
          setPrepaymentFrequency={setPrepaymentFrequency}
          prepaymentFrequencyState={prepaymentFrequencyState as PrepaymentFrequencyOptions}
          // prepaymentFrequencyRef={prepaymentFrequencyRef}
          resetKey={resetKey}
          calculator={calculator}
        />

      </div>

      <Output
        calculator={calculator}
      />

    {/*</div>*/}
    </Container>

  )
}