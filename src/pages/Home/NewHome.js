import React from 'react';
import { BdsPaper, BdsTypo } from 'blip-ds/dist/blip-ds-react';
import settings from '../../config';

import Header from './components/Header';

const BLANK = '_blank';

const Home = () => {
    return (
        <>
            <div className="ph1 ph4-m ph5-ns pb5">
                <Header
                    title="Blip desk scheduler"
                    onClick={() => window.open(settings.repositoryUrl, BLANK)}
                />

                <BdsPaper className="pa4 mt4">
                    <BdsTypo
                        style={{ color: '#3A4A65' }}
                        margin={0}
                        variant="fs-24"
                        bold="bold"
                    >
                        Dias e horários com atendimento
                    </BdsTypo>

                    <div className="mt2">
                        <BdsTypo style={{ color: '#3A4A65' }} variant="fs-15">
                            Preencha os horários de atendimento conforme os dias
                            da semana. Obs.: Você pode adicionar mais de um
                            intervalo de horário por dia.
                        </BdsTypo>
                    </div>

                    <div className="flex items-center justify-end">Teste</div>
                </BdsPaper>

                <BdsPaper className="pa4 mt4">Teste</BdsPaper>
            </div>
        </>
    );
};

export default Home;
