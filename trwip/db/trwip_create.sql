CREATE TABLE IF NOT EXISTS viajante (
seq_viajante INT(6) NOT NULL AUTO_INCREMENT COMMENT 'Identificacao do viajante'
,nom_viajante VARCHAR(100) NOT NULL COMMENT 'Nome completo do viajante'
,eml_acesso VARCHAR(50) NOT NULL COMMENT 'Email usado para acessar a plataforma'
,val_senha VARCHAR(60) NOT NULL COMMENT 'Senha segura do viajante'
,num_documento VARCHAR(15) NOT NULL COMMENT 'Numero de identificacao do viajante. CPF ou CNPJ'
,num_telefone VARCHAR(15) NOT NULL COMMENT 'Numero de telefone do viajante'
,des_endereco VARCHAR(100) NOT NULL COMMENT 'Endereco completo do viajante'
,tip_genero CHAR(1) DEFAULT 'N' COMMENT 'M - masculino, F - feminino, N - nao informado'
,val_renda FLOAT COMMENT 'Valor da renda familiar'
,tip_continente CHAR(2) NOT NULL COMMENT 'AN - America do Norte, AC - America Central, AS - America do Sul, AF - Africa e AI - Asica'
,cod_pais INT(6) NOT NULL COMMENT 'Identifica do pais em que sera a viagem'
,cod_estado INT(6) NOT NULL COMMENT 'Identifica o estado da viagem'
,cod_cidade INT(6) NOT NULL COMMENT 'Identifica a cidade, segundo o IBGE'
,med_foto BLOB NOT NULL COMMENT 'Foto do viajante'
,dat_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Data em que o viajante se cadastrou'
,dat_inativo DATETIME NOT NULL DEFAULT '0000-00-00' COMMENT 'Data em que cancelou seu acesso'
,PRIMARY KEY(seq_viajante)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
COMMENT = 'Relaciona os viajante com acesso as viagens';

CREATE TABLE IF NOT EXISTS viajante_idioma (
seq_viajante INT(6) NOT NULL AUTO_INCREMENT COMMENT 'Idenficacao do viajante'
,ind_ingles CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Lingua inglesa'
,ind_frances CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Lingua francesa'
,ind_espanhol CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Lingua espanhola'
,ind_arabe CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Lingua arabe'
,ind_mandarim CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Lingua chinesa'
,ind_portugues CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Lingua portuguesa'
,ind_bengali CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Lingua indiana'
,ind_indi CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Lingua indiana'
,ind_russo CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Lingua russa'
,ind_japones CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Lingua japonesa'
,ind_alemao CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Lingua alema'
,ind_outro CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Outro idioma'
,PRIMARY KEY(seq_viajante)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
COMMENT = 'Relaciona os idiomas de um viajante';

CREATE TABLE IF NOT EXISTS viajante_avaliacao (
seq_viagem INT(6) NOT NULL COMMENT 'Identifcacao da viagem'
,seq_avaliado INT(6) NOT NULL COMMENT 'Identificacao do viajante avaliado'
,seq_avaliador INT(6) NOT NULL COMMENT 'Identificacao do viajante avaliador'
,val_humor TINYINT NOT NULL DEFAULT 0 COMMENT 'Quanto essa pessoa e bem humorada'
,val_parceria TINYINT NOT NULL DEFAULT 0 COMMENT 'Quanto essa pessoa contribui para o bem-estar de todos'
,txt_observacao TEXT COMMENT 'Outras informacoes relevantes sobre o viajante nessa viagem'
,PRIMARY KEY(seq_viagem, seq_avaliador)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
COMMENT = 'Avalia um viajante em uma viagem';

CREATE TABLE IF NOT EXISTS viagem (
seq_viagem INT(6) NOT NULL AUTO_INCREMENT COMMENT 'Identificacao da viagem'
,seq_organizador INT(6) NOT NULL COMMENT 'Identificacao do organizador que e tb um viajante'
,val_orcamento FLOAT NOT NULL COMMENT 'Valor previsto para a viagem'
,dat_checkin DATETIME NOT NULL COMMENT 'Data de inicio da viagem'
,dat_checkout DATETIME NOT NULL COMMENT 'Data de termino da viagem'
,num_minimo INT(2) COMMENT 'Numero minimo de participantes'
,num_maximo INT(2) COMMENT 'Numero maximo de participantes'
,txt_parceiro TEXT NOT NULL COMMENT 'Qual o perfil do parceiro ideal para essa viagem'
,txt_informacoes TEXT NOT NULL COMMENT 'Que outras informacoes, atracoes ou dicas para essa viagem'
,med_foto BLOB NOT NULL COMMENT 'Foto que caracterize a viagem'
,dat_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Data em que a viagem foi cadastrada'
,dat_inativo DATETIME NOT NULL DEFAULT '0000-00-00' COMMENT 'Data em que o registro foi desativado'
,PRIMARY KEY(seq_viagem)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
COMMENT = 'Relaciona as viagens';

CREATE TABLE IF NOT EXISTS viagem_itinerario (
seq_viagem INT(6) NOT NULL COMMENT 'Identifcacao da viagem'
,tip_continente CHAR(2) NOT NULL COMMENT 'AN - America do Norte, AC - America Central, AS - America do Sul, AF - Africa e AI - Asica'
,cod_pais INT(6) NOT NULL COMMENT 'Identifica do pais em que sera a viagem'
,cod_estado INT(6) NOT NULL COMMENT 'Identifica o estado da viagem'
,cod_cidade INT(6) NOT NULL COMMENT 'Identifica a cidade, segundo o IBGE'
,url_hotel varchar(255) COMMENT 'URL do hotel referencia no destino'
,ind_aviao CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Deslocamento por aviao'
,ind_onibus CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Deslocamento por onibus'
,ind_carro CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Deslocamento por carro'
,ind_barco CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Deslocamento por barco'
,ind_metro CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Deslocamento por metro'
,ind_trem CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Deslocamento por trem'
,ind_bicicleta CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Deslocamento por bicicleta'
,PRIMARY KEY(seq_viagem)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
COMMENT = 'Relaciona as formas de deslocamento usadas na viagem';

CREATE TABLE IF NOT EXISTS viagem_perfil (
seq_viagem INT(6) NOT NULL COMMENT 'Identifcacao da viagem'
,ind_kids CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Viagem com criancas'
,ind_aventura CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Viagem de aventura'
,ind_negocio CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Viagem de negocio'
,ind_cult CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Viagem para conhecer museus, cidades e culturas'
,ind_religiosa CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Viagem para locais sagrados com foco no aprendizado e na oracao'
,ind_lgbt CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Viagem especializada em casais lgbt'
,ind_gastronomica CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Viagem para conhecer restaurantes, vinicolas'
,ind_danca CHAR(1) NOT NULL DEFAULT 'N' COMMENT 'Viagem para dancar'
,PRIMARY KEY(seq_viagem)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
COMMENT = 'Relaciona o perfil viagem';

CREATE TABLE IF NOT EXISTS viagem_avaliacao (
seq_viagem INT(6) NOT NULL COMMENT 'Identifcacao da viagem'
,seq_avaliador INT(6) NOT NULL COMMENT 'Identificacao do viajante avaliador'
,val_hospedagem TINYINT NOT NULL DEFAULT 0 COMMENT 'Quao confortavel eram as hospedagens'
,val_transporte TINYINT NOT NULL DEFAULT 0 COMMENT 'Quao pontual, seguro e confortavel eram os transportes'
,val_seguranca TINYINT NOT NULL DEFAULT 0 COMMENT 'Quao seguro eram os locais, as atracoes e as hospedagens'
,val_viajante TINYINT NOT NULL DEFAULT 0 COMMENT 'Quao bom foi estar com as pessoas do grupo'
,val_itinerario TINYINT NOT NULL DEFAULT 0 COMMENT 'Quao interessante foi o itinerario'
,val_atracao TINYINT NOT NULL DEFAULT 0 COMMENT 'Quao divertidas foram as atracoes'
,txt_observacao TEXT COMMENT 'Outras informacoes relevantes sobre a viagem'
,PRIMARY KEY(seq_viagem, seq_avaliador)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci
COMMENT = 'Avalia uma viagem';