-- CreateTable
CREATE TABLE `Produto` (
    `id_produto` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_produto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_produto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fornecedor` (
    `id_fornecedor` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_fornecedor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_fornecedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Historico` (
    `id_compra` INTEGER NOT NULL AUTO_INCREMENT,
    `data_compra` DATETIME(3) NOT NULL,
    `id_fornecedor` INTEGER NOT NULL,
    `id_produto` INTEGER NOT NULL,

    INDEX `Historico_id_fornecedor_id_produto_idx`(`id_fornecedor`, `id_produto`),
    PRIMARY KEY (`id_compra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `Produto`(`id_produto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historico` ADD CONSTRAINT `Historico_id_fornecedor_fkey` FOREIGN KEY (`id_fornecedor`) REFERENCES `Fornecedor`(`id_fornecedor`) ON DELETE RESTRICT ON UPDATE CASCADE;
