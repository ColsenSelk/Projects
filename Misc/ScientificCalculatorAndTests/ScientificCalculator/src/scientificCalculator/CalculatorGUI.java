package scientificCalculator;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class CalculatorGUI extends JFrame {
	protected JTextField displayField;
    protected JPanel buttonPanel;
//    private String firstOperand;
//    private String secondOperand;
//    private String operation;
    protected CalculatorUserInput calculatorUserInput;

    public CalculatorGUI() {
    	calculatorUserInput = new CalculatorUserInput();
//    	firstOperand = "";
//    	secondOperand = "";
//    	operation = "";
    	
    	setTitle("Calculator");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        displayField = new JTextField();
        displayField.setEditable(false);
        add(displayField, BorderLayout.NORTH);

        buttonPanel = new JPanel();
        buttonPanel.setLayout(new GridLayout(6, 4));

        String[] buttonLabels = {
                "7", "8", "9", "/",
                "4", "5", "6", "*",
                "1", "2", "3", "-",
                "0", ".", "=", "+",
                "M+", "M-", "M-Recall", "M-Clear",
                "Delete", "Square", "Square Root", "Reset"
        };

        for (String label : buttonLabels) {
            JButton button = new JButton(label);
            button.addActionListener(new ButtonClickListener());
            buttonPanel.add(button);
        }

        add(buttonPanel, BorderLayout.CENTER);

        pack();
        setLocationRelativeTo(null);
    }

    protected class ButtonClickListener implements ActionListener {
        public void actionPerformed(ActionEvent e) {
            String command = e.getActionCommand();
            if (command.equals("=")) {
                try {
					calculatorUserInput.ReadInput(displayField.getText());
                	calculatorUserInput.ReadInput(command);
					displayField.setText(calculatorUserInput.result);
				} catch (InvalidOperationException e1) {
					displayField.setText(e1.GetError());
					calculatorUserInput.ResetOp();
				}
                calculatorUserInput.ResetOp();
            }
            else if (command.equals("/") || command.equals("*") || command.equals("+")) {
            	if (!calculatorUserInput.operation.equals("")) {
        			displayField.setText("Error: cannot have more than 1 operator per equation");
        			calculatorUserInput.ResetOp();
        			return;
        		}
            	
            	try {
					calculatorUserInput.ReadInput(displayField.getText());
            		calculatorUserInput.ReadInput(command);
            		displayField.setText("");
				} catch (InvalidOperationException e1) {
					displayField.setText(e1.GetError());
					calculatorUserInput.ResetOp();
				}
            }
            else if (command.equals("-")) {
            	if (displayField.getText().equals("")) { // negative value
                	displayField.setText(displayField.getText() + command);
            	}
            	else { // - is operator
            		if (!calculatorUserInput.operation.equals("")) {
            			displayField.setText("Error: cannot have more than 1 operator per equation");
            			calculatorUserInput.ResetOp();
            			return;
            		}
            		try {
    					calculatorUserInput.ReadInput(displayField.getText());
                		calculatorUserInput.ReadInput(command);
                		displayField.setText("");
    				} catch (InvalidOperationException e1) {
    					displayField.setText(e1.GetError());
    					calculatorUserInput.ResetOp();
    				}
            	}
            }
            else if (command.equals("0") || command.equals("1") || command.equals("2") || command.equals("3") || command.equals("4") || 
            		command.equals("5") || command.equals("6") || command.equals("7") || command.equals("8") || command.equals("9") || 
            		command.equals(".")) {
            	if (calculatorUserInput.operation.equals("")) {
            		displayField.setText(displayField.getText() + command);
            	}
            	else {
            		displayField.setText(displayField.getText() + command);
            	}
            }
            else if (command.equals("M+") || command.equals("M-")) {
            	try {
					calculatorUserInput.ReadInput(command);
				} catch (InvalidOperationException e1) {
					displayField.setText(e1.GetError());
					calculatorUserInput.ResetOp();
				}
            }
            else if (command.equals("M-Recall")) {
            	try {
					displayField.setText(calculatorUserInput.calculatorOperations.MRecall());
				} catch (InvalidOperationException e1) {
					displayField.setText(e1.GetError());
					calculatorUserInput.ResetOp();
				}
            }
            else if (command.equals("M-Clear")) {
            	try {
            		calculatorUserInput.ReadInput(command);
            		displayField.setText("MemoryCleared");
				} catch (InvalidOperationException e1) {
					displayField.setText(e1.GetError());
				}
            	calculatorUserInput.ResetOp();
            }
            else if (command.equals("Delete")) {
            	displayField.setText(removeLastCharacter(displayField.getText()));
            }
            else if (command.equals("Square") || command.equals("Square Root")) {
            	try {
					calculatorUserInput.ReadInput(displayField.getText());
            		calculatorUserInput.ReadInput("("+ command + ")");
            		displayField.setText("");
				} catch (InvalidOperationException e1) {
					displayField.setText(e1.GetError());
					calculatorUserInput.ResetOp();
				}
            }
            else if (command.equals("Reset")) {
            	calculatorUserInput.ResetOp();
            	calculatorUserInput.calculatorOperations.MClear();
            	displayField.setText("");
            }
            else {
                displayField.setText(displayField.getText() + command);
            }
        }

        /*
        private void calculate() {
            String expression = displayField.getText();
            try {
                // Evaluate the expression using JavaScript engine
                Object result = new javax.script.ScriptEngineManager().getEngineByName("JavaScript").eval(expression);
                displayField.setText(result.toString());
            } catch (Exception ex) {
                displayField.setText("Error");
            }
        }*/
    }
    
    public static String removeLastCharacter(String str) {
        if (str == null || str.isEmpty() || str.equals("")) {
            return str; // If the string is null or empty, return as is
        }
        return str.substring(0, str.length() - 1); // Return a substring excluding the last character
    }
    
    public void simulateButtonClick(String command) {
    	if (command.equals("=")) {
            try {
				calculatorUserInput.ReadInput(displayField.getText());
            	calculatorUserInput.ReadInput(command);
				displayField.setText(calculatorUserInput.result);
			} catch (InvalidOperationException e1) {
				displayField.setText(e1.GetError());
				calculatorUserInput.ResetOp();
			}
            calculatorUserInput.ResetOp();
        }
        else if (command.equals("/") || command.equals("*") || command.equals("+")) {
        	if (!calculatorUserInput.operation.equals("")) {
    			displayField.setText("Error: cannot have more than 1 operator per equation");
    			calculatorUserInput.ResetOp();
    			return;
    		}
        	
        	try {
				calculatorUserInput.ReadInput(displayField.getText());
        		calculatorUserInput.ReadInput(command);
        		displayField.setText("");
			} catch (InvalidOperationException e1) {
				displayField.setText(e1.GetError());
				calculatorUserInput.ResetOp();
			}
        }
        else if (command.equals("-")) {
        	if (displayField.getText().equals("")) { // negative value
            	displayField.setText(displayField.getText() + command);
        	}
        	else { // - is operator
        		if (!calculatorUserInput.operation.equals("")) {
        			displayField.setText("Error: cannot have more than 1 operator per equation");
        			calculatorUserInput.ResetOp();
        			return;
        		}
        		try {
					calculatorUserInput.ReadInput(displayField.getText());
            		calculatorUserInput.ReadInput(command);
            		displayField.setText("");
				} catch (InvalidOperationException e1) {
					displayField.setText(e1.GetError());
					calculatorUserInput.ResetOp();
				}
        	}
        }
        else if (command.equals("0") || command.equals("1") || command.equals("2") || command.equals("3") || command.equals("4") || 
        		command.equals("5") || command.equals("6") || command.equals("7") || command.equals("8") || command.equals("9") || 
        		command.equals(".")) {
        	if (calculatorUserInput.operation.equals("")) {
        		displayField.setText(displayField.getText() + command);
        	}
        	else {
        		displayField.setText(displayField.getText() + command);
        	}
        }
        else if (command.equals("M+") || command.equals("M-")) {
        	try {
				calculatorUserInput.ReadInput(command);
			} catch (InvalidOperationException e1) {
				displayField.setText(e1.GetError());
				calculatorUserInput.ResetOp();
			}
        }
        else if (command.equals("M-Recall")) {
        	try {
				displayField.setText(calculatorUserInput.calculatorOperations.MRecall());
			} catch (InvalidOperationException e1) {
				displayField.setText(e1.GetError());
				calculatorUserInput.ResetOp();
			}
        }
        else if (command.equals("M-Clear")) {
        	try {
        		calculatorUserInput.ReadInput(command);
        		displayField.setText("MemoryCleared");
			} catch (InvalidOperationException e1) {
				displayField.setText(e1.GetError());
			}
        	calculatorUserInput.ResetOp();
        }
        else if (command.equals("Delete")) {
        	displayField.setText(removeLastCharacter(displayField.getText()));
        }
        else if (command.equals("Square") || command.equals("Square Root")) {
        	try {
				calculatorUserInput.ReadInput(displayField.getText());
        		calculatorUserInput.ReadInput("("+ command + ")");
        		displayField.setText("");
			} catch (InvalidOperationException e1) {
				displayField.setText(e1.GetError());
				calculatorUserInput.ResetOp();
			}
        }
        else if (command.equals("Reset")) {
        	calculatorUserInput.ResetOp();
        	calculatorUserInput.calculatorOperations.MClear();
        	displayField.setText("");
        }
        else {
            displayField.setText(displayField.getText() + command);
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            CalculatorGUI calculator = new CalculatorGUI();
            calculator.setVisible(true);
        });
    }
}
