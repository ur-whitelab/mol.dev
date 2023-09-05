<h1 align="center">
  <a href="https://mol.dev">Mol.dev</a>
</h1>

![version](https://img.shields.io/badge/version-0.5.0-brightgreen)
[![paper](https://img.shields.io/badge/paper-OpenReview-red)](https://openreview.net/forum?id=pCbCRfUSoh)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)


- [Purpose]()
- [Usage]()
- [Model Card](#model-card)

# Purpose

This repository keeps the models and src for [mol.dev](https://mol.dev) application.
Mol.dev is a web application that uses deep ensemble and RNN models to predict small molecules' properties and uncertainties quickly and accurately, without relying on servers.
It uses an JavaScript implementation of the Tensor Flow library to run the trained model directly on any end-point device.
By developing mol.dev, we expect to ease the prediction of small molecule properties.

# Usage

Our model is available at https://mol.dev to use. 
Once the page is loaded, two input sections will be available: one for inserting a string representation of the molecule of interest using SMILES format, and the other using SELFIES format. 
It is important to note that only one input is needed; when the string is inserted correctly, the model will automatically fill the other field with the correct representation.<p align="center">
![Screenshot 2023-02-07 at 3 43 30 PM](https://user-images.githubusercontent.com/14205657/217366380-798ac85b-fa96-4551-8de1-6d0fe49da27b.png)</p>

After inputing a string representation, the application will show its structure in the header<p align="center">
![Screenshot 2023-02-07 at 3 44 01 PM](https://user-images.githubusercontent.com/14205657/217367432-9ac3fd7e-5880-4339-8bfa-aa7572825923.png)</p>

and the prediction will be computed.<p align="center">
  ![Screenshot 2023-02-07 at 3 44 47 PM](https://user-images.githubusercontent.com/14205657/217367445-3642cd01-9008-4331-bb61-f6ca5fd2c24f.png)</p>
  
The button "Expand ▶️" can be used to get information about the prediction of each element in the ensemble.

# Model Card

- **Model Details**: Solubility predictor with uncertainty. Model is a bidirectional LSTM that predict standard deviation and mean. An ensemble of 10 is combined for predictions. Epistemic uncertainty comes from model disagreement.
- **Intended**: Use Organic molecules
- **Factors**: Model may not generalize to large molecules, very insoluble (< -12.5 logS), and highly soluble (> 1 logS), ions, or metals.
- **Metrics**: Test correlation 0.76. Test MAE 1.37
- **Evaluation**: Data Withheld examples (test data)
- **Training Data**: 9982 molecules, which was augmented to 96625 molecules.
- **Ethical Considerations**: None noted
- **Caveats**: Check the parity plot to see where your molecule falls relative to the training curve.
<p align="center">
  <img style="width: 50%;" src="https://github.com/ur-whitelab/mol.dev/blob/main/models/rnn-fit.png?raw=true" alt="Mol.dev implemented model parity plot with metrics">
</p>

# Important Note

Please, note that this is an ongoing research. The results showed here are results of models that are still being developed and improved.

# Citation

Please, cite [Ramos et al.](https://arxiv.org/abs/2307.05318):
```
@misc{ramos2023solubility,
  doi = {10.48550/ARXIV.2307.05318},
  url = {https://arxiv.org/abs/2307.05318},
  author = {Ramos,  Mayk Caldas and White,  Andrew D.},
  keywords = {Chemical Physics (physics.chem-ph),  Machine Learning (cs.LG),  FOS: Physical sciences,  FOS: Physical sciences,  FOS: Computer and information sciences,  FOS: Computer and information sciences},
  title = {Predicting small molecules solubilities on endpoint devices using deep ensemble neural networks},
  publisher = {arXiv},
  year = {2023},
  copyright = {Creative Commons Attribution 4.0 International}
}
```